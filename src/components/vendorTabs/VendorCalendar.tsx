'use client'

import { useGetCalendarDataQuery } from '@/redux/calendarApis'
import { Badge, Calendar, Card } from 'antd'
import type { BadgeProps } from 'antd'
import type { Dayjs } from 'dayjs'
import Loader from '../loading/ReactLoader'

const VendorCalendar: React.FC = () => {
  const { data: calendarData, isLoading } = useGetCalendarDataQuery()

  if (isLoading) return <Loader />

  const getListData = (value: Dayjs) => {
    const dateString = value.format('YYYY-MM-DD')
    if (!calendarData?.data) return []

    return calendarData.data
      .filter((booking: any) => booking.date.startsWith(dateString))
      .map((booking: any) => ({
        type: booking.is_paid ? 'success' : 'warning',
        content: `${booking.event_name} (${booking.category})`,
      }))
  }

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)
    return (
      <ul className="events">
        {listData.map((item: any, index: number) => (
          <li key={index}>
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Card className="shadow-lg rounded-xl p-4 bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">
        Vendor Booking Calendar
      </h2>
      <Calendar dateCellRender={dateCellRender} className="rounded-xl" />
    </Card>
  )
}

export default VendorCalendar
