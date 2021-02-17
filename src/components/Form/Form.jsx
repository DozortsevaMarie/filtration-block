import React, { useState } from "react";
import style from "./Form.module.css";
import InputMask from "react-input-mask";
import { Button, Form, Input, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import classNames from "classnames";

const InputBase = (props) => (
  <InputMask mask="(999)999-9999" value={props.value} onChange={props.onChange}>
    {(inputProps) => (
      <Input
        {...inputProps}
        type={props.type || "tel"}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    )}
  </InputMask>
);

const initialNewItem = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: {
    city: "",
    streetAddress: "",
    state: "",
    zip: "",
  },
  description: "",
};
const initialErrors = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};
const emailRegExp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const FormBase = ({ addNewItem }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [newItem, setNewItem] = useState(initialNewItem);
  const [errors, setErrors] = useState(initialErrors);

  const fields = [
    {
      name: "id",
      placeholder: "id",
      label: "ID",
      type: "text",
      isRequired: true,
      value: newItem.id,
      setValue: (value) =>
        setNewItem((prevState) => ({
          ...prevState,
          id: value,
        })),
    },
    {
      name: "firstName",
      placeholder: "Firstname",
      label: "Firstname",
      type: "text",
      isRequired: true,
      value: newItem.firstName,
      setValue: (value) =>
        setNewItem((prevState) => ({
          ...prevState,
          firstName: value,
        })),
    },
    {
      name: "lastName",
      placeholder: "LastName",
      label: "LastName",
      type: "text",
      isRequired: true,
      value: newItem.lastName,
      setValue: (value) =>
        setNewItem((prevState) => ({
          ...prevState,
          lastName: value,
        })),
    },
    {
      name: "email",
      placeholder: "Email",
      label: "Email",
      type: "email",
      isRequired: true,
      value: newItem.email,
      setValue: (value) =>
        setNewItem((prevState) => ({
          ...prevState,
          email: value,
        })),
    },
    {
      name: "phone",
      placeholder: "Phone",
      label: "Phone",
      isRequired: true,
      value: newItem.phone,
      setValue: (value) =>
        setNewItem((prevState) => ({
          ...prevState,
          phone: value,
        })),
    },
    {
      name: "streetAddress",
      placeholder: "Street address",
      label: "Street address",
      isRequired: false,
      value: newItem.streetAddress,
      setValue: (value) =>
        setNewItem((prevState) => ({
          ...prevState,
          address: {
            ...prevState.address,
            streetAddress: value,
          },
        })),
    },
    {
      name: "city",
      placeholder: "City",
      label: "City",
      type: "text",
      isRequired: false,
      value: newItem.city,
      setValue: (value) =>
        setNewItem((prevState) => ({
          ...prevState,
          address: {
            ...prevState.address,
            city: value,
          },
        })),
    },
    {
      name: "state",
      placeholder: "State",
      label: "State",
      type: "text",
      isRequired: false,
      value: newItem.state,
      setValue: (value) =>
        setNewItem((prevState) => ({
          ...prevState,
          address: {
            ...prevState.address,
            state: value,
          },
        })),
    },
    {
      name: "zip",
      placeholder: "Zip",
      label: "Zip",
      type: "number",
      isRequired: false,
      value: newItem.zip,
      setValue: (value) =>
        setNewItem((prevState) => ({
          ...prevState,
          address: {
            ...prevState.address,
            zip: value,
          },
        })),
    },
    {
      name: "description",
      placeholder: "Description",
      label: "Description",
      type: "text",
      isRequired: false,
      value: newItem.description,
      setValue: (value) =>
        setNewItem((prevState) => ({
          ...prevState,
          description: value,
        })),
    },
  ];

  const handleSubmitClick = () => {
    const item = {
      key: Math.random().toString(36).substr(2, 9),
      ...newItem,
    };
    addNewItem(item);
    setIsVisible(false);
    message.success("New item is added");
  };

  const handleSubmit = (e) => {
    let isError = false;
    fields.forEach((item) => {
      if (item.isRequired && item.name !== "phone") {
        if (newItem[item.name] === "") {
          setErrors((prevState) => ({
            ...prevState,
            [item.name]: "Field is required",
          }));
          isError = true;
        } else {
          switch (item.name) {
            case "id":
              {
                if (newItem[item.name].match(/[^\d]+/)) {
                  setErrors((prevState) => ({
                    ...prevState,
                    [item.name]: "Only numbers are possible",
                  }));
                  isError = true;
                }
              }
              break;
            case "firstName":
            case "lastName":
              {
                if (newItem[item.name].match(/[^a-zA-Zа-яА-Я]+/)) {
                  setErrors((prevState) => ({
                    ...prevState,
                    [item.name]: "Only letters are possible",
                  }));
                  isError = true;
                }
              }
              break;
            case "email":
              {
                if (!emailRegExp.test(newItem[item.name])) {
                  setErrors((prevState) => ({
                    ...prevState,
                    [item.name]: "Email is invalid",
                  }));
                  isError = true;
                }
              }
              break;
          }
        }
      }
    });

    if (isError) {
      e.preventDefault();
    }
  };

  return (
    <>
      {!isVisible ? (
        <Button
          className={style.Button}
          type="primary"
          onClick={() => setIsVisible(true)}
        >
          Add New Item
        </Button>
      ) : (
        <Form className={style.formContainer} onFinish={handleSubmitClick}>
          {fields.map((field) => {
            const handleChangeValue = (e) => {
              setErrors((prevState) => ({
                ...prevState,
                [field.name]: "",
              }));
              field.setValue(e.currentTarget.value);
            };
            let formInput;
            switch (field.name) {
              case "phone":
                formInput = (
                  <InputBase
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={handleChangeValue}
                  />
                );
                break;
              case "description":
                formInput = (
                  <TextArea
                    placeholder={field.placeholder}
                    value={field.value}
                    type={field.type}
                    onChange={handleChangeValue}
                  />
                );
                break;
              default:
                formInput = (
                  <Input
                    placeholder={field.placeholder}
                    value={field.value}
                    type={field.type}
                    onChange={handleChangeValue}
                  />
                );
            }
            return (
              <div key={`key_${field.name}`}>
                <Form.Item
                  rules={[{ required: field.isRequired }]}
                  label={field.label}
                  name={field.name}
                  className={classNames({
                    [style.input_error]: errors[field.name],
                  })}
                >
                  {formInput}
                </Form.Item>
                {errors[field.name] && (
                  <div className={style.error}>{errors[field.name]}</div>
                )}
              </div>
            );
          })}
          <Form.Item rules={[{ required: true }]} className={style.submitBtn}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default FormBase;
