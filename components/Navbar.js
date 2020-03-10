import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
        <div className="container">
            <a className="navbar-brand" href="#">Buy Moto</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link href="/orders"><a className="nav-link">My Orders</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/cart"><a className="nav-link">Cart</a></Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Navbar;