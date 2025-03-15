import { FC } from "react";
import Barcode from "react-barcode";

interface BarcodeComponentProps {
  value: string;
}

const BarcodeComponent: FC<BarcodeComponentProps> = ({ value }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          marginBottom: "10px", 
          fontSize: "18px", 
          fontWeight: "bold", 
          fontFamily: "Arial, sans-serif", 
        }}
      >
        {value}
      </div>
      <Barcode
        value={value}
        format="CODE128"
        displayValue={false}
      />
    </div>
  );
};

export default BarcodeComponent;