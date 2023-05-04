import React, { useEffect, useState } from 'react';
import StudentForm from '@/components/StudentForm/StudentForm';
import StudentTable from '@/components/StudentTable/StudentTable';
import { Divider, notification } from 'antd';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchStudents = async () => {
    setLoading(true);
    const res = await fetch('/api/students');
    setLoading(false);
    if (res.status !== 200) {
      notification.error({
        message: 'Error',
        description:
          'Error with the student list request, please try it again.',
      });
    }
    const data = await res.json();
    setStudents(data.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <StudentForm onSubmitSuccess={fetchStudents} />
      <Divider />
      <StudentTable loading={loading} data={students} />
    </div>
  );
}

export default Students;
