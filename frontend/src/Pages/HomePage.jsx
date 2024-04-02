
import RenderProductCards from '../Components/RenderProductCards';
import Header from '../Components/Header';

const HomePage = () => {
    return (
        <div>
            <Header />

            <h1>Home Page</h1>

            <RenderProductCards />
            <Sidebar />
        </div>
    );
}

export default HomePage;