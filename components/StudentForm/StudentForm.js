import { Form, Input, DatePicker, Button, notification } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';

const StudentForm = ({ onSubmitSuccess }) => {
  const [form] = Form.useForm();

  const disabledDate = (current) => {
    return current && current > moment().subtract(10, 'years').startOf('day');
  };

  const handleSubmit = async (values) => {
    if (!values.firstName || !values.familyName || !values.dob) {
      notification.error({
        message: 'Error',
        description: 'Please fill in all fields',
      });
      return;
    }

    const newStudent = {
      firstName: values.firstName,
      familyName: values.familyName,
      dob: values.dob.format('YYYY-MM-DD'),
    };
    const res = await fetch(`/api/addStudent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
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
        Add a student
      </div>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          firstName: '',
          familyName: '',
          dob: dayjs('2000-01-01', 'YYYY-MM-DD'),
        }}
      >
        <Form.Item
          label='First Name'
          name='firstName'
          rules={[{ required: true, message: 'Please input first name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Family Name'
          name='familyName'
          rules={[{ required: true, message: 'Please input family name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Date of Birth'
          name='dob'
          rules={[{ required: true, message: 'Please select date of birth' }]}
        >
          <DatePicker format='YYYY-MM-DD' disabledDate={disabledDate} />
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

export default StudentForm;
