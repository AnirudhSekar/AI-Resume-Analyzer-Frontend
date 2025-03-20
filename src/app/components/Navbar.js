import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">AI Resume Analyzer</h1>
      <div>
        <Link href="/" className="mr-4 hover:underline">Home</Link>
        <Link href="/college-results" className="hover:underline">College Results</Link>
      </div>
    </nav>
  );
};

export default Navbar;
