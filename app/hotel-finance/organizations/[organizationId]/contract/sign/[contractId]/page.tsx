import SignatureClient from './SignatureClient'

export default function SignaturePage({ 
  params 
}: { 
  params: { organizationId: string; contractId: string } 
}) {
  return <SignatureClient organizationId={params.organizationId} contractId={params.contractId} />
}
