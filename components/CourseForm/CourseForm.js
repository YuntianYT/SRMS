import { Form, Input, Button, notification } from 'antd';

const CourseForm = ({ onSubmitSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    if (!values.courseName) {
      notification.error({
        message: 'Error',
        description: 'Please fill in all fields',
      });
      return;
    }

    const newCourse = {
      courseName: values.courseName,
    };
    const res = await fetch(`/api/addCourse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCourse),
    });
    const resData = await res.json();
    if (res.status === 200) {
      form.resetFields();
      notification.success({
        message: 'Success',
        description: resData.description,
      });
      onSubmitSuccess();
    } else {
      notification.error({
        message: 'Error',
        description: resData.description,
      });
    }
  };

  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          margin: '2rem',
          fontSize: '2rem',
          fontFamily: 'sans-serif',
        }}
      >
        Add a course
      </div>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          courseName: '',
        }}
      >
        <Form.Item
          label='Course Name'
          name='courseName'
          rules={[{ required: true, message: 'Please input course name' }]}
        >
          <Input />
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Form.Item noStyle>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default CourseForm;
