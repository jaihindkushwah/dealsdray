import React, { memo, useEffect, useState } from "react";

const ImageComponent = ({ employeeId }: { employeeId: string }) => {
  const [imageHTML, setImageHTML] = useState("");

  useEffect(() => {
    const fetchEmployeeImage = async () => {
      try {
        const response = await fetch(
          `/employee/image/${employeeId}?width=60&height=60`
        );
        const html = await response.text(); // Fetching the HTML response as text
        setImageHTML(html);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchEmployeeImage();
  }, [employeeId]);

  return (
    <span
      className="flex justify-center items-center"
      dangerouslySetInnerHTML={{ __html: imageHTML }}
    />
  );
};

export default memo(ImageComponent);
