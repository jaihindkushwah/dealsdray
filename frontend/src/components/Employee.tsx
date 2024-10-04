import React, { useCallback, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import PageTitle from "./PageTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import useEmployee from "../hooks/useEmployee";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CheckBox: React.FC<CheckBoxProps> = ({ className, ...props }) => {
  return (
    <Field
      type="checkbox"
      className={cn([
        "flex h-5 w-5 rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ])}
      {...props}
    />
  );
};

// import React from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { cn } from "../lib/utils";
// import PageTitle from "./PageTitle";
// import { useLocation } from "react-router-dom";

// Form validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: Yup.string().required("Mobile number is required"),
  designation: Yup.string().required("Designation is required"),
  gender: Yup.string().required("Please select gender"),
  course: Yup.string().required("Please select a course"),
  file: Yup.mixed()
    .required("File is required")
    .test("fileType", "Only jpeg/png files are allowed", (value: any) => {
      return (
        value && (value.type === "image/jpeg" || value.type === "image/png")
      );
    }),
});

function Employee() {
  const location = useLocation();
  const navigate = useNavigate();
  const { createEmployee, getEmployeeById, updateEmployee } = useEmployee();
  const [error, setError] = React.useState("");
  const [updateError, setUpdateError] = React.useState("");
  const urlSearch = new URLSearchParams(location.search);
  const id = urlSearch.get("id");
  const [initialValues, setInitialValues] = React.useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    file: null,
  });
  useEffect(() => {
    if (id) {
      // fetch employee data
      getEmployeeById(id)
        .then((data) => {
          console.log(data);
          setInitialValues({
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            designation: data.designation,
            gender: data.gender,
            course: data.course,
            file: null,
          });
          setUpdateError("");
        })
        .catch((error) => {
          setUpdateError(error.response.data.error);
        });
    }
  }, [id, getEmployeeById]);

  const handleSubmit = useCallback(
    async (values: any) => {
      console.log("Form Data:", values);
      try {
        if (id) {
          // update employee
          const data = await updateEmployee(id, values);
          console.log(data);
          alert("Employee updated successfully");
          setError("");
          navigate("/employee_list");
        } else {
          // create employee
          await createEmployee(values);
          alert("Employee created successfully");
          setInitialValues({
            name: "",
            email: "",
            mobile: "",
            designation: "",
            gender: "",
            course: "",
            file: null,
          });
          setError("");
          navigate("/employee_list");
        }
      } catch (error: any) {
        setError(error.response.data.error);
      }
    },
    [createEmployee, id, updateEmployee, navigate]
  );

  return (
    <main className="flex flex-col items-center  overflow-x-hidden">
      <PageTitle title={id ? "Update Employee" : "Create Employee"} />
      {error && <div className="text-red-500">{error}</div>}
      {updateError && <div className="text-red-500">{updateError}</div>}
      {updateError && id ? null : (
        <div className="p-5 w-full max-w-[420px] sm:max-w-[520px] mt-5 sm:mt-10">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            // validate={(values) => {
            //   console.log(values);
            // }}
            // onReset={() => setInitialValues(initialValues)}
            enableReinitialize
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <Form className="grid gap-4 items-center sm:grid-cols-2 grid-cols-[1fr_2fr]">
                <label htmlFor="name">Name</label>
                <span>
                  <Field name="name" as={Input} placeholder="Name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </span>

                <label htmlFor="email">Email</label>
                <span>
                  <Field name="email" as={Input} placeholder="Email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </span>

                <label htmlFor="mobile">Mobile No</label>
                <span>
                  <Field name="mobile" as={Input} placeholder="Mobile No" />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red-500"
                  />
                </span>

                <label htmlFor="designation">Designation</label>
                <span>
                  <Field
                    as="select"
                    name="designation"
                    className="  flex h-10 w-full rounded-md border border-input 
                  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 
                  file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                   focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                  </Field>
                  <ErrorMessage
                    name="designation"
                    component="div"
                    className="text-red-500"
                  />
                </span>

                <label htmlFor="gender">Gender</label>
                <span>
                  <span className="flex items-center gap-4">
                    <CheckBox type="radio" name="gender" value="Male" />
                    <label htmlFor="Male">M</label>
                    <CheckBox type="radio" name="gender" value="Female" />
                    <label htmlFor="Female">F</label>
                  </span>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500"
                  />
                </span>

                <label htmlFor="course">Course</label>
                <span>
                  <span className="flex gap-2 items-center">
                    <CheckBox
                      type="checkbox"
                      name="course"
                      checked={values.course.includes("MCA")}
                      onChange={(e) => setFieldValue("course", e.target.value)}
                      value="MCA"
                    />
                    <label htmlFor="MCA">MCA</label>
                    <CheckBox
                      type="checkbox"
                      name="course"
                      checked={values.course.includes("BCA")}
                      onChange={(e) => setFieldValue("course", e.target.value)}
                      value="BCA"
                    />
                    <label htmlFor="BCA">BCA</label>
                    <CheckBox
                      type="checkbox"
                      name="course"
                      checked={values.course.includes("BSC")}
                      onChange={(e) => setFieldValue("course", e.target.value)}
                      value="BSC"
                    />
                    <label htmlFor="BSC">BSC</label>
                  </span>
                  <ErrorMessage
                    name="course"
                    component="div"
                    className="text-red-500"
                  />
                </span>

                <label htmlFor="file">Img Upload</label>
                <span className="mt-1">
                  {/* <label htmlFor="Img Upload">Img Upload</label> */}
                  {/* only image */}
                  <Input
                    type="file"
                    name="file"
                    placeholder="Img Upload"
                    onChange={(e) =>
                      setFieldValue("file", e.target?.files?.[0])
                    }
                    accept="image/jpeg, image/png"
                    id="file"
                  />

                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-red-500"
                  />
                </span>

                <div className="col-span-2 flex justify-center items-center">
                  <Button
                    type="submit"
                    className="w-[150px] mt-2 bg-[#1ebd39] hover:bg-[#0dcb06] text-white"
                  >
                    {id ? "Update" : "Submit"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </main>
  );
}

export default Employee;
