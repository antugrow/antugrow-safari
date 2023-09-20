import MainLayout from "@/layouts/MainLayout";
import { NextPageWithLayout } from "@/types/Layout";

const dashboard: NextPageWithLayout = () => {
	return <div>dashboard</div>;
};

dashboard.getLayout = (c) => <MainLayout>{c}</MainLayout>;

export default dashboard;
