import { axiosInstance } from "@/utils/axios"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { GiveawayType } from "@/types/Giveaways"
import GiveAwayBtn from "@/components/GiveAwayBtn"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  const giveaways = await axiosInstance.get("/giveaways")
  console.log(giveaways.data)

  return (
    <main className='min-h-screen bg-primary text-primary-foreground'>
      <div className='p-8 '>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl'>Give aways</h1>
          <Button className='bg-indigo-700' asChild>
            <Link href='/create'>Create</Link>
          </Button>
        </div>

        <section className='space-y-4 my-4'>
          {giveaways.data.map((item: GiveawayType) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <GiveAwayBtn id={item.id} />
              </CardHeader>
            </Card>
          ))}
        </section>
      </div>
    </main>
  )
}
