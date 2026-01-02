import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PipelineStage {
  name: string;
  count: number;
  value: string;
  color: string;
}

const stages: PipelineStage[] = [
  { name: "Prospecting", count: 24, value: "$120K", color: "bg-primary/20" },
  { name: "Qualification", count: 18, value: "$95K", color: "bg-primary/40" },
  { name: "Proposal", count: 12, value: "$180K", color: "bg-primary/60" },
  { name: "Negotiation", count: 8, value: "$240K", color: "bg-primary/80" },
  { name: "Closed Won", count: 5, value: "$320K", color: "bg-success" },
];

export function SalesPipeline() {
  const totalDeals = stages.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sales Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pipeline visualization */}
        <div className="flex h-4 rounded-full overflow-hidden">
          {stages.map((stage, index) => (
            <div
              key={stage.name}
              className={cn(
                "transition-all duration-500",
                stage.color
              )}
              style={{ width: `${(stage.count / totalDeals) * 100}%` }}
            />
          ))}
        </div>

        {/* Stage details */}
        <div className="grid grid-cols-5 gap-2">
          {stages.map((stage) => (
            <div key={stage.name} className="text-center space-y-1 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <p className="text-2xl font-bold">{stage.count}</p>
              <p className="text-xs text-muted-foreground font-medium">{stage.name}</p>
              <p className="text-sm font-semibold text-primary">{stage.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
