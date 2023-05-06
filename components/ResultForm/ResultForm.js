import { Form, Button, notification, Select } from 'antd';
import { useEffect, useState } from 'react';

const ResultForm = ({ onSubmitSuccess }) => {
  const [form] = Form.useForm();
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const handleSubmit = async (values) => {
    if (!values.courseName || !values.studentName || !values.score) {
      notification.error({
        message: 'Error',
        description: 'Please fill in all fields',
      });
      return;
    }
    const newResult = {
      courseName: values.courseName,
      studentName: values.studentName,
      score: values.score,
    };
    const res = await fetch(`/api/addResult`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newResult),
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

  const scoreData = ['A', 'B', 'C', 'D', 'E', 'F'];
  useEffect(() => {
    const getCourses = async () => {
      const res = await fetch(`/api/courses`);
      const resData = await res.json();
      if (res.status === 200) {
        setCourses(resData.data);
      }
    };
    const getStudents = async () => {
      const res = await fetch(`/api/students`);
      const resData = await res.json();
      if (res.status === 200) {
        setStudents(resData.data);
      }
    };
    getCourses();
    getStudents();
  }, []);
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
        Add a result
      </div>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          courseName: undefined,
          studentName: undefined,
          score: undefined,
        }}
      >
        <Form.Item
          label='Course Name'
          name='courseName'
          rules={[{ required: true, message: 'Please select course name' }]}
        >
          <Select
            showSearch
            placeholder='Select a course'
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={courses?.map((course) => ({
              value: course.courseName,
              label: course.courseName,
            }))}
          />
        </Form.Item>
        <Form.Item
          label='Student Name'
          name='studentName'
          rules={[{ required: true, message: 'Please select student name' }]}
        >
          <Select
            showSearch
            placeholder='Select a student'
            optionFilterProp='children'
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={students?.map((student) => ({
              value: `${student.firstName} ${student.familyName}`,
              label: `${student.firstName} ${student.familyName}`,
            }))}
          />
        </Form.Item>
        <Form.Item
          label='Score'
          name='score'
          rules={[{ required: true, message: 'Please select score' }]}
        >
          <Select
            placeholder='Select a score'
            options={scoreData.map((score) => ({ label: score, value: score }))}
          />
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          <Form.Item noStyle>
            <Button type='primary' htmlType='submit'>
              Add
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ResultForm;
