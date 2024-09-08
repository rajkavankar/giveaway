"use client"
import React, { useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "./ui/switch"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { axiosInstance } from "@/utils/axios"
import { GiveawayType } from "@/types/Giveaways"

type Props = {
  id: string
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  isActive: z.boolean(),
  expiry: z.union([
    z.date({
      required_error: "expiry is required.",
    }),
    z.string(),
  ]),
})
const UpdateGiveawayForm = ({ id }: Props) => {
  const [giawayData, setGiveAwayData] = useState<GiveawayType>(
    {} as GiveawayType
  )
  useEffect(() => {
    axiosInstance(`/giveaways/${id}`)
      .then((res) => {
        console.log(res.data)

        setGiveAwayData(res.data)
      })
      .catch((err) => console.log(err))
  }, [id])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: giawayData.title!,
      isActive: giawayData.isActive!,
      expiry: giawayData.expiry! as Date,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axiosInstance.patch(`/giveaways/${id}`, {
        ...values,
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    // console.log(values)
  }
  return (
    <div className='container mx-auto my-5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isActive'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>Active</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='expiry'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Expiry</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default UpdateGiveawayForm
