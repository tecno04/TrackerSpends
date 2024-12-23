import { Fragment } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import { useBudget } from "../hook/useBudget";
import { ExpenseForm } from './ExpenseForm';

export default function ExpenseModal() {

  const { state, dispatch, amountSpend } = useBudget()

  const percentaje = +((amountSpend / state.budget) * 100).toFixed(2)

  const notAvailaibleMoney = () => {

    return percentaje === 100

  }

  return (
    <>
      <div className="fixed right-5 bottom-5 flex items-center justify-center">
        <button
          type="button"
          onClick={() => dispatch({type:'show-modal'})}
          disabled={ notAvailaibleMoney() }
          className={`${percentaje === 100 ? 'disabled:opacity-20' : ''}`}
        >
          <PlusCircleIcon className='w-16 h-16 text-blue-600 rounded-full' />
        </button>
      </div>

        {/* 
            en el parametro "show" instanciamos la variable "state" y accedemos a la propiedad "modal" (que es un valor boolean)
            donde al cambiar entre true o false, para mostrar (o no) el Modal.
            En el "onClose" usamos el "dispatch" y pasamos el type para poder cerrarlo 
            (no hay crucesita pero se puede clickear) afuera para poder cerrarlo
        */}
      <Transition appear show={state.modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=> dispatch({type:'close-modal'}) }>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
    
                  {/* Instanciamos el formulario */}
                  <ExpenseForm />
    
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}