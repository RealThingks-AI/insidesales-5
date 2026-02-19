

## Fix Contact Dropdown Performance

### Root Cause
The Account dropdown is fast because it only has ~500 records. The Contact dropdown renders all 4000+ `CommandItem` components into the DOM when opened, causing major lag. The fix is to **limit the number of rendered items** and show a "type to search" hint.

### Changes

**File: `src/components/ContactSearchableDropdown.tsx`**

1. **Limit rendered items to 50** -- When there's no search term, only show the first 50 contacts. When searching, show up to 50 filtered results. This keeps DOM size small regardless of total dataset.

2. **Add a count indicator** -- Show "Showing X of Y contacts" so users know there are more results available by typing.

3. **Keep the paginated fetch** -- All 4000+ contacts remain loaded in memory for instant client-side search, but only 50 are rendered as DOM elements at a time.

```
// Replace the filteredContacts memo with:
const filteredContacts = useMemo(() => {
  if (!searchValue) return contacts.slice(0, 50);
  const searchLower = searchValue.toLowerCase();
  return contacts.filter(c =>
    c.contact_name?.toLowerCase().includes(searchLower) ||
    c.company_name?.toLowerCase().includes(searchLower) ||
    c.email?.toLowerCase().includes(searchLower) ||
    c.position?.toLowerCase().includes(searchLower)
  ).slice(0, 50);
}, [contacts, searchValue]);
```

4. **Add hint text below the list** -- When results are truncated, show "Type to search among {total} contacts" to guide the user.

### Why This Works
- Account dropdown is fast because ~500 DOM nodes is fine for the browser
- Rendering 50 items instead of 4000+ eliminates the lag on open and search
- All contacts remain in memory so search is instant (just filtering an array)
- The `.slice(0, 50)` caps DOM rendering while `useMemo` keeps filtering efficient
