'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

interface SupplyRequest {
  id: string
  itemId: string
  itemName: string
  quantity: number
  requestedBy: string
  requestedDate: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

interface SupplyRequestListProps {
  requests: SupplyRequest[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function SupplyRequestList({ requests, onApprove, onReject }: SupplyRequestListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'Approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'Rejected':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'Approved':
        return 'bg-green-100 text-green-700'
      case 'Rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  const pendingRequests = requests.filter((r) => r.status === 'Pending')

  return (
    <div className="space-y-4">
      {pendingRequests.length === 0 && (
        <Card>
          <CardContent className="pt-12 text-center">
            <p className="text-slate-500">No pending requests</p>
          </CardContent>
        </Card>
      )}

      {pendingRequests.map((request) => (
        <Card key={request.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {getStatusIcon(request.status)}
                <div>
                  <CardTitle>{request.itemName}</CardTitle>
                  <CardDescription>
                    Requested by {request.requestedBy} on{' '}
                    {new Date(request.requestedDate).toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Quantity Requested</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{request.quantity}</p>
              </div>
              {request.status === 'Pending' && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => onApprove(request.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => onReject(request.id)}
                    variant="destructive"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {requests.filter((r) => r.status !== 'Pending').length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Request History</h3>
          <div className="space-y-2">
            {requests
              .filter((r) => r.status !== 'Pending')
              .map((request) => (
                <Card key={request.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{request.itemName}</p>
                        <p className="text-sm text-slate-600">Qty: {request.quantity}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
