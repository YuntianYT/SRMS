import React, { useEffect, useState } from 'react';
import { Divider, notification } from 'antd';
import CourseForm from '@/components/CourseForm/CourseForm';
import CourseTable from '@/components/CourseTable/CourseTable';

function Courses() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCourses = async () => {
    setLoading(true);
    const res = await fetch('/api/courses');
    setLoading(false);
    if (res.status !== 200) {
      notification.error({
        message: 'Error',
        description:
          'Error with the courses list request, please try it again.',
      });
    }
    const data = await res.json();
    setStudents(data.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <CourseForm onSubmitSuccess={fetchCourses} />
      <Divider />
      <CourseTable loading={loading} data={students} />
    </div>
  );
}

export default Courses;
