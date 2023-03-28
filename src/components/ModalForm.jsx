import ListForm from "./ListForm";
import LinkForm from "./LinkForm";
import CategoryForm from "./CategoryForm";

const ModalForm = ({ modalState, setModalState, modalTitle, dataType, categoriesList = [] }) => {
  const hideModal = () => {
    setModalState("relative z-10 hidden");
  };

  const displayDataForm = () => {
    if (dataType == "link") {
      return <LinkForm />;
    } else if (dataType == "list") {
      return <ListForm 
        categoriesList={categoriesList}
      />;
    } else if (dataType == "category") {
      return <CategoryForm />;
    }
  };

  return (
    <>
      <div
        className={modalState}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900 mb-5"
                      id="modal-title"
                    >
                      {modalTitle}
                    </h3>
                    {displayDataForm()}
                    <button
                      onClick={() => hideModal()}
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalForm;
