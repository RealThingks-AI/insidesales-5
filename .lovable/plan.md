
## Fix: Fetch All Records in Search Dropdowns (Beyond 1000 Limit)

### Root Cause
Supabase/PostgREST silently caps query results at 1000 rows. Both `ContactSearchableDropdown` and `LeadSearchableDropdown` use a single `.select()` call without pagination, so only the first 1000 records are returned. With 4000+ contacts, the remaining records are invisible in the dropdown.

### Changes

**File: `src/components/ContactSearchableDropdown.tsx`**

1. **Paginated fetch** -- Replace the single query with a loop that fetches in batches of 1000 using `.range()`, appending results until all contacts are loaded:
   ```
   const PAGE_SIZE = 1000;
   let allData = [];
   let from = 0;
   let hasMore = true;
   while (hasMore) {
     const { data, error } = await supabase
       .from('contacts')
       .select('id, contact_name, company_name, email, phone_no, position, region, linkedin')
       .order('contact_name', { ascending: true })
       .range(from, from + PAGE_SIZE - 1);
     if (error) throw error;
     allData = [...allData, ...(data || [])];
     hasMore = (data?.length || 0) === PAGE_SIZE;
     from += PAGE_SIZE;
   }
   setContacts(allData);
   ```

2. **Fix cmdk filtering** -- Add `filter={() => 1}` to the `<Command>` component (alongside existing `shouldFilter={false}`) to guarantee cmdk never hides items internally, letting the manual `filteredContacts` logic be the sole filter.

**File: `src/components/LeadSearchableDropdown.tsx`**

1. **Paginated fetch** -- Same batched loop pattern for leads (preserving the `.neq('lead_status', 'Converted')` filter).

2. **Fix cmdk filtering** -- Add `shouldFilter={false}` and `filter={() => 1}` to the `<Command>` component (currently missing both), preventing cmdk's built-in filter from conflicting with the manual `filteredLeads` logic.

### Why This Works
- Each batch fetches up to 1000 rows via `.range(offset, offset + 999)`
- The loop continues until a batch returns fewer than 1000 rows (meaning all records have been fetched)
- The existing `useMemo` filtering handles client-side search across all loaded records
- The `filter={() => 1}` ensures cmdk never hides items that the manual filter intends to show
