"use client";

import { DataGrid } from '@/components/datagrid/Datagrid';
import {SelectFilter } from '@/components/datagrid/filters/column-filter';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, Trash2 } from "lucide-react";
import { gql } from 'graphql-request';
import { Button } from '@/components/ui/Button';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending";
  course: string;
  department: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  enrollmentDate: string;
  grade: string;
  city: string;
  country: string;
  guardianName: string;
  attendancePercentage: number;
}

const GET_STUDENT = gql`
  query GetStudents {
    students(first: 10) {
        edges {
        cursor
        node {
            id
            firstName
            lastName
            email
            grade
            status
        }
        }
        pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
        }
        totalCount
    }
    }
`;

export default function StudentDataGrid() {
    const columns: ColumnDef<Student>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'firstName',
        header: 'First Name',
    },
    {
        accessorKey: 'lastName',
        header: 'Last Name',
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
        const student = row.original;

        const handleView = () => {
            alert(`Viewing ${student.name}`);
        };
        const handleEdit = () => {
            alert(`Editing ${student.name}`);
        };
        const handleDelete = () => {
            alert(`Deleting ${student.name}`);
        };

        return (
            <div className="flex items-center justify-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleView}>
                    <Eye className="h-4 w-4 text-blue-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleEdit}>
                    <Edit className="h-4 w-4 text-green-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
            </div>
        );
        },
    },
    ];


    return (
        <DataGrid
            columns={columns}
            enablePagination={true}
            enableSorting={true}
            enableGlobalFilter={true}
            showToolbar={true}
            keyName='students'
            query={GET_STUDENT}
        />
    );
}