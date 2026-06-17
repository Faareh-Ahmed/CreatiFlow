import Header from '@/components/shared/header';
import TransformationForm from '@/components/shared/transformationform';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

type TransformationTypeKey = keyof typeof transformationTypes;

interface SearchParamProps {
  params: Promise<{
    type: TransformationTypeKey;
  }>;
}

const AddTransformationTypePage = async (props: SearchParamProps) => {
  const params = await props.params;
  const { type } = params;
  const { userId } = await auth();
  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in')

  const user = await getUserById(userId);

  return (
    <div className="max-w-container-max-width mx-auto px-margin-desktop">
      <Header
        title={transformation.title}
        subtitle={transformation.subTitle}
        creditBalance={user.creditBalance}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </div>
  )
}

export default AddTransformationTypePage