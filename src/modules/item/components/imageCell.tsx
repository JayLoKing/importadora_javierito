/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Loader, Table } from 'rsuite';
import { FaBoxOpen } from 'react-icons/fa';
import Image from 'rsuite/Image';

const {  Cell } = Table;

const ImageCell = ({ rowData, ...props }: { rowData: any }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  
  const preloadImage = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  useEffect(() => {
    if (!rowData.itemImage) {
      setImgError(true);
      setImgLoading(false);
      return;
    }

    setImgLoading(true);
    setImgError(false);

    preloadImage(rowData.itemImage).then((success) => {
      setImgLoading(false);
      if (!success) {
        setImgError(true);
      }
    });
  }, [rowData.itemImage]);

  return (
    <Cell
      {...props}
      style={{
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          width: 70,
          height: 70,
          background: '#f5f5f5',
          borderRadius: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          boxSizing: 'border-box',
          userSelect: 'none',
        }}
      >
        {imgError || !rowData.itemImage ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
              userSelect: 'none',
            }}
          >
            <FaBoxOpen
              style={{
                fontSize: 16,
                color: '#999',
                marginBottom: 2,
                userSelect: 'none',
              }}
            />
            <div
              style={{
                fontSize: 9,
                color: '#999',
                lineHeight: 1.1,
                textAlign: 'center',
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'wrap',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
              }}
            >
              Imagen no disponible
            </div>
          </div>
        ) : imgLoading ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
              userSelect: 'none',
            }}
          >
           <Loader vertical content="Cargando" size="sm" />
          </div>
        ) : (
          <Image
            src={rowData.itemImage}
            width={65}
            height={65}
            onError={() => setImgError(true)}
            alt={`Imagen de ${rowData.name}`}
            style={{
              objectFit: 'contain',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        )}
      </div>
    </Cell>
  );
};

export default ImageCell;