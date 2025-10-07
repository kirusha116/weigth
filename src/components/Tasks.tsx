import { tasks } from '@/constants/tasks'
import { CircleCheck } from 'lucide-react'

export default function Tasks() {
  return (
    <div className="mr-6">
      <h1 className="text-2xl mb-6">
        <b>Задания</b>
      </h1>
      <div className="flex flex-wrap ">
        {tasks.map(({ icon, title, price }, index) => {
          return (
            <div
              className={`flex items-center rounded-lg bg-white border shadow-xs px-3 py-2 ${
                index % 2 && 'ml-1'
              }`}
              style={{ width: 'calc(50% - 2px)' }}
            >
              <div className="h-9 rounded-md aspect-square bg-rose-300 mr-4 flex justify-center items-center">
                {icon}
              </div>
              <div>
                <p>
                  <b>{title}</b>
                </p>
                <p>{`+${price} баллов`}</p>
              </div>
              <div className="grow"></div>
              <div className="h-9 rounded-md aspect-square bg-rose-300 flex justify-center items-center">
                <CircleCheck className="stroke-white" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
