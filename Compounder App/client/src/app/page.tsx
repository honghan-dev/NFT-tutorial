import { Holdings, Total, Transaction } from '@/components'

const HomePage = () => {

  return (
    <main className="px-mobile-padding py-mobile-padding">
      <Total />
      <Holdings />
      <Transaction />
    </main>
  )
}

export default HomePage