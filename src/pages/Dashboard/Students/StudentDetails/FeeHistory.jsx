import React, { useState, useEffect } from 'react';
import { studentService } from '../../../../services/api/student.service';
import Button from '../../../../components/common/Button/Button';
import DataTable from '../../../../components/common/DataTable/DataTable';
import './FeeHistory.css';

const FeeHistory = ({ studentId }) => {
    const [feeData, setFeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        fetchFeeData();
    }, [studentId, selectedYear]);

    const fetchFeeData = async () => {
        try {
            const data = await studentService.getStudentFees(studentId, selectedYear);
            setFeeData(data);
        } catch (error) {
            console.error('Error fetching fee data:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            header: 'Receipt No',
            accessor: 'receiptNo',
        },
        {
            header: 'Date',
            accessor: 'date',
            cell: (row) => new Date(row.date).toLocaleDateString()
        },
        {
            header: 'Description',
            accessor: 'description',
        },
        {
            header: 'Amount',
            accessor: 'amount',
            cell: (row) => `₹${row.amount.toLocaleString()}`
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (row) => (
                <span className={`status-badge ${row.status.toLowerCase()}`}>
                    {row.status}
                </span>
            )
        },
        {
            header: 'Actions',
            cell: (row) => (
                <div className="action-buttons">
                    <Button
                        variant="outline"
                        size="small"
                        onClick={() => handleDownloadReceipt(row.receiptNo)}
                    >
                        Download Receipt
                    </Button>
                </div>
            )
        }
    ];

    const handleDownloadReceipt = async (receiptNo) => {
        try {
            await studentService.downloadFeeReceipt(receiptNo);
        } catch (error) {
            console.error('Error downloading receipt:', error);
        }
    };

    if (loading) return <div>Loading fee history...</div>;
    if (!feeData) return <div>No fee data available</div>;

    return (
        <div className="fee-history">
            <div className="fee-header">
                <div className="fee-summary">
                    <div className="summary-card">
                        <span className="summary-label">Total Fees</span>
                        <span className="summary-value">₹{feeData.totalFees.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <DataTable columns={columns} data={feeData.fees} />
        </div>
    );
};

export default FeeHistory; 