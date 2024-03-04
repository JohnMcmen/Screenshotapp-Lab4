import React from 'react';

const Gallery = ({ images }) => {
  return (
    <div>
      <h2>Your Screenshot Gallery!</h2>
      <ul className="gallery-container">
        {images && images.length > 0 ? (
          images.map((pic, index) => (
            <li className="gallery" key={index}>
              <img
                className="gallery-screenshot"
                src={pic}
                alt={`Screenshot ${index}`}
                width="500"
              />
            </li>
          ))
        ) : (
          <div>
            <h3>You haven't made a screenshot yet!</h3>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Gallery;
