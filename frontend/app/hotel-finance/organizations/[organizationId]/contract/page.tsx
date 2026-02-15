import ContractClient from './ContractClient'

export default function ContractPage({ params }: { params: { organizationId: string } }) {
  return <ContractClient organizationId={params.organizationId} />
}
