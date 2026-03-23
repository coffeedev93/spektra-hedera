import AppLayout from "@/components/common/layout";
import SendPayment from "@/components/send";

export default async function SendPaymentPage({ params, searchParams }) {
	const { username } = await params;
	const query = await searchParams;
  return (
		<AppLayout>
			<SendPayment 
				_username={username}
				_query={query}
			/>
		</AppLayout>
	)
}