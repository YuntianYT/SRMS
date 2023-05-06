import { Table } from 'antd';
import React, { useState } from 'react';

const columns = [
  {
    title: 'No.',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: 'Course',
    dataIndex: 'courseName',
    key: 'courseName',
  },
  {
    title: 'Student',
    dataIndex: 'studentName',
    key: 'studentName',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
];

function ResultTable({ data, loading }) {
  const [pageSize, setPageSize] = useState(4);
  const results = data.map((result, index) => ({
    courseName: result.courseName,
    studentName: result.studentName,
    score: result.score,
    num: index + 1,
    key: result._id,
  }));
  return (
    <div style={{ marginTop: '2rem' }}>
      <Table
        pagination={{ pageSize }}
        columns={columns}
        loading={loading}
        dataSource={results}
        onChange={(pagination) => {
          setPageSize(pagination.pageSize);
        }}
      />
    </div>
  );
}

export default ResultTable;
