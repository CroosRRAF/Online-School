const BookBorrowSection = ({ books }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Borrowed Books</h3>
      {books.length === 0 ? (
        <p className="text-gray-500">No books borrowed.</p>
      ) : (
        <ul className="space-y-2">
          {books.map((book, index) => (
            <li key={index} className="border p-3 rounded-lg">
              <div className="font-semibold">{book.bookTitle}</div>
              <div className="text-sm text-gray-500">
                Borrowed: {new Date(book.borrowDate).toLocaleDateString()} <br />
                Return: {new Date(book.returnDate).toLocaleDateString()} <br />
                Status: {book.status} • Fine: Rs. {book.fine}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookBorrowSection;
