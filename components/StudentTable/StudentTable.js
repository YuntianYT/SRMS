import { Table } from 'antd';
import React, { useState } from 'react';

const columns = [
  {
    title: 'No.',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Family Name',
    dataIndex: 'familyName',
    key: 'familyName',
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dob',
    key: 'dob',
  },
];

function StudentTable({ data, loading }) {
  const [pageSize, setPageSize] = useState(4);
  const students = data.map((student, index) => ({
    firstName: student.firstName,
    familyName: student.familyName,
    dob: student.dob,
    num: index,
    key: student._id,
  }));
  return (
    <div style={{ marginTop: '2rem' }}>
      <Table
        pagination={{ pageSize }}
        columns={columns}
        loading={loading}
        dataSource={students}
        onChange={(pagination) => {
          setPageSize(pagination.pageSize);
        }}
      />
    </div>
  );
}

export default StudentTable;
