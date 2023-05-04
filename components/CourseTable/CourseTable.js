import { Table } from 'antd';
import React, { useState } from 'react';

const columns = [
  {
    title: 'No.',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: 'Course Name',
    dataIndex: 'courseName',
    key: 'courseName',
  },
];

function CourseTable({ data, loading }) {
  const [pageSize, setPageSize] = useState(5);
  const courses = data.map((course, index) => ({
    courseName: course.courseName,
    key: course._id,
    num: index + 1,
  }));
  return (
    <div style={{ marginTop: '2rem' }}>
      <Table
        pagination={{ pageSize }}
        columns={columns}
        loading={loading}
        dataSource={courses}
        onChange={(pagination) => {
          setPageSize(pagination.pageSize);
        }}
      />
    </div>
  );
}

export default CourseTable;
