import AppLayout from "@/components/common/layout";
import SendPayment from "@/components/send";

export default async function SendPaymentPage({ params }) {
	const { username } = await params;
  return (
		<AppLayout>
			<SendPayment 
				_username={username}
			/>
		</AppLayout>
	)
}