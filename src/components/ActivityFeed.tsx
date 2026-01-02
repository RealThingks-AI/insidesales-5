import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Mail, FileText, CheckCircle2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "deal" | "note";
  title: string;
  description: string;
  time: string;
  user: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "call",
    title: "Call with Sarah Johnson",
    description: "Discussed pricing options for enterprise plan",
    time: "10 min ago",
    user: "JD",
  },
  {
    id: "2",
    type: "deal",
    title: "Deal closed - TechCorp Inc",
    description: "Won $45,000 annual contract",
    time: "1 hour ago",
    user: "MK",
  },
  {
    id: "3",
    type: "email",
    title: "Follow-up sent to Global Solutions",
    description: "Sent proposal documentation",
    time: "2 hours ago",
    user: "ER",
  },
  {
    id: "4",
    type: "meeting",
    title: "Demo scheduled - NextGen Systems",
    description: "Product demo for decision makers",
    time: "3 hours ago",
    user: "AF",
  },
  {
    id: "5",
    type: "note",
    title: "Note added to Innovate Labs",
    description: "Budget confirmed for Q2",
    time: "4 hours ago",
    user: "MC",
  },
];

const iconMap = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  deal: CheckCircle2,
  note: FileText,
};

const colorMap = {
  call: "bg-primary/10 text-primary",
  email: "bg-warning/10 text-warning",
  meeting: "bg-success/10 text-success",
  deal: "bg-success/10 text-success",
  note: "bg-muted text-muted-foreground",
};

export function ActivityFeed() {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.type];
            return (
              <div
                key={activity.id}
                className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={cn(
                    "flex items-center justify-center h-10 w-10 rounded-full shrink-0",
                    colorMap[activity.type]
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {activity.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-secondary">
                      {activity.user}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
