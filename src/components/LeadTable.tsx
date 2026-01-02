import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Phone, Mail } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "qualified" | "closed";
  value: string;
  lastContact: string;
}

const leads: Lead[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "TechCorp Inc",
    email: "sarah@techcorp.com",
    phone: "+1 555-0123",
    status: "qualified",
    value: "$45,000",
    lastContact: "2 hours ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    company: "Innovate Labs",
    email: "m.chen@innovate.io",
    phone: "+1 555-0456",
    status: "new",
    value: "$28,000",
    lastContact: "1 day ago",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    company: "Global Solutions",
    email: "emily.r@globalsol.com",
    phone: "+1 555-0789",
    status: "contacted",
    value: "$62,000",
    lastContact: "3 hours ago",
  },
  {
    id: "4",
    name: "David Kim",
    company: "NextGen Systems",
    email: "d.kim@nextgen.com",
    phone: "+1 555-0321",
    status: "qualified",
    value: "$85,000",
    lastContact: "5 hours ago",
  },
  {
    id: "5",
    name: "Amanda Foster",
    company: "Digital Dynamics",
    email: "a.foster@digidyn.com",
    phone: "+1 555-0654",
    status: "closed",
    value: "$32,000",
    lastContact: "1 week ago",
  },
];

const statusVariantMap: Record<Lead["status"], "new" | "contacted" | "qualified" | "closed"> = {
  new: "new",
  contacted: "contacted",
  qualified: "qualified",
  closed: "closed",
};

export function LeadTable() {
  return (
    <div className="rounded-xl border bg-card animate-slide-up">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[250px]">Lead</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Last Contact</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id} className="group">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={statusVariantMap[lead.status]} className="capitalize">
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold">{lead.value}</TableCell>
              <TableCell className="text-muted-foreground">{lead.lastContact}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
