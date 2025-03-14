import { Card, Container, Wrapper } from '../components/email';
import { EventCard } from '../components/event-card';
import { Footer } from '../components/footer';
import { Logo } from '../components/logo';

const urls = {
	dashboard: 'asd',
	newsletter: 'asd'
};

export const PurchaseConfirmationMail = () => {
	return (
		<Wrapper>
			<Container>
				<EventCard />
				<Card>
					<div className="text-center">
						<Logo />
						<h1>{'subject'}</h1>
					</div>
					<div>
						<p>{'content'}</p>
						<hr />
						<p className="pt-4">
							Mit freundlichen Grüßen,
							<br />
							DEA Team
						</p>
						<hr />
					</div>
					<div className="px-4 opacity-50 text-center">
						<p>
							Diese E-Mail wurde aufgrund Ihrer Kontoeinstellungen bei{' '}
							<a href={urls.dashboard}>DEA</a> gesendet. Wenn Sie keine weiteren
							E-Mails erhalten möchten, klicken Sie hier, um{' '}
							<a href={urls.newsletter}>abzumelden</a>.
						</p>
					</div>
				</Card>
				<Footer />
			</Container>
		</Wrapper>
	);
};
