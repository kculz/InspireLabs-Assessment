import PropTypes from 'prop-types';

const SearchResult = ({ results }) => {
    console.log(results)
  return (
    <div>
      <h2>Search Results</h2>
      {results.map((result) => (
        <div key={result.id}>
          <h3>{result.title}</h3>
          {result.artist && <p>Artist: {result.artist.name}</p>}
          {result.album && <p>Album: {result.album.title}</p>}
        </div>
      ))}
    </div>
  );
};

SearchResult.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      artist: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      album: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
      // Add additional prop types as needed
    })
  ).isRequired,
};

export default SearchResult;