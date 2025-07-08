import { Badge } from '@contecon/ui/components/badge'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@contecon/ui/components/card'
import { Skeleton } from '@contecon/ui/components/skeleton'
import { TrendingUpIcon } from 'lucide-react'

export type DashboardCardItem = {
  title: string
  trending: string
  value: string
  description: string
  loading: boolean
}

export function DashboardCard({ title, trending, value, description, loading }: DashboardCardItem) {
  if (loading) {
    return <Skeleton />
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardDescription>{title}</CardDescription>
          <Badge variant='outline' className='flex gap-1 rounded-lg text-xs'>
            <TrendingUpIcon className='size-3' />
            {trending}
          </Badge>
        </div>
        <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>{value}</CardTitle>
      </CardHeader>
      <CardFooter className='flex-col items-start text-sm -mt-2'>
        <div className='flex gap-2 font-normal text-muted-foreground'>{description}</div>
      </CardFooter>
    </Card>
  )
}
