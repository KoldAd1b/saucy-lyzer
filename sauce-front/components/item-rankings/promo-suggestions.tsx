"use client"

import { ArrowUpRight, Percent, Tag, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PromoSuggestions() {
  const suggestions = [
    {
      item: "Veggie Wrap",
      strategy: "Bundle with popular side",
      expectedLift: 15,
      icon: Tag,
    },
    {
      item: "Seafood Pasta",
      strategy: "Happy hour discount",
      expectedLift: 20,
      icon: Percent,
    },
    {
      item: "Quinoa Bowl",
      strategy: "Feature in health menu",
      expectedLift: 12,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid gap-4">
      {suggestions.map((suggestion) => (
        <Card key={suggestion.item}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{suggestion.item}</CardTitle>
            <CardDescription>{suggestion.strategy}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center">
              <suggestion.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Expected Lift: {suggestion.expectedLift}%</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="sm" className="w-full">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Apply Promotion
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
