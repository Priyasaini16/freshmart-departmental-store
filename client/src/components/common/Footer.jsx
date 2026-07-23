function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20 py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold text-green-400">
          FreshMart
        </h2>

        <p className="mt-3 text-gray-400">
          Your one-stop supermarket for fresh groceries and daily essentials.
        </p>

        <p className="mt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} FreshMart. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;