import React from 'react';
import './ProfileSteps.css';
import { FaCircle } from 'react-icons/fa';
import { BsFillFileEarmarkTextFill } from 'react-icons/bs';

const ProfileStep2 = ({ formData, handleChange, nextStep, prevStep }) => {
    const categories = [
        { "id": 1, "Name": "Construction & Renovation" },
        { "id": 2, "Name": "Event Planning" },
        { "id": 3, "Name": "Education" }
    ];

    const subcategories = [
        { "id": 1, "Name": "Civil Engineers", "CategoryId": 1 },
        { "id": 2, "Name": "Mechanical Engineers", "CategoryId": 1 },
        { "id": 3, "Name": "Electrical Engineers", "CategoryId": 1 },
        { "id": 4, "Name": "Architects", "CategoryId": 1 },
        { "id": 5, "Name": "Interior Designers", "CategoryId": 1 },
        { "id": 6, "Name": "General Contractors", "CategoryId": 1 },
        { "id": 7, "Name": "Carpenters", "CategoryId": 1 },
        { "id": 8, "Name": "Plumbers", "CategoryId": 1 },
        { "id": 9, "Name": "Electricians", "CategoryId": 1 },
        { "id": 10, "Name": "Painters", "CategoryId": 1 },
        { "id": 11, "Name": "Event Planners", "CategoryId": 2 },
        { "id": 12, "Name": "Caterers", "CategoryId": 2 },
        { "id": 13, "Name": "Decorators", "CategoryId": 2 },
        { "id": 14, "Name": "DJs/Musicians", "CategoryId": 2 },
        { "id": 15, "Name": "Photographers/Videographers", "CategoryId": 2 },
        { "id": 16, "Name": "Lessons", "CategoryId": 3 }

        // Add other subcategories here
    ];

    const handleCategoryChange = (categoryId, isChecked) => {
        const updatedCategoryIds = isChecked
            ? [...(formData.CategoryIds || []), categoryId]
            : (formData.CategoryIds || []).filter(id => id !== categoryId);

        handleChange({
            target: { name: 'CategoryIds', value: updatedCategoryIds },
        });
    };

    const handleSubCategoryChange = (subCategoryId, isChecked) => {
        let updatedSubCategoryIds = formData.SubCategoryIds || [];

        if (isChecked) {
            updatedSubCategoryIds = [...updatedSubCategoryIds, subCategoryId];
        } else {
            updatedSubCategoryIds = updatedSubCategoryIds.filter(id => id !== subCategoryId);
        }

        handleChange({
            target: { name: 'SubCategoryIds', value: updatedSubCategoryIds },
        });
    };

    const visibleSubcategories = subcategories.filter(subcategory =>
        formData.CategoryIds.includes(subcategory.CategoryId)
    );

    return (
        <div className="ProfileStepMain " id="ProfileStepMain">
            <div className="w-100 d-flex justify-content-center align-items-center my-5">
                <div className="box-div bg-white d-flex align-items-center py-5 rounded-5 justify-content-center">
                    <div className="container row">
                        <h3 className='py-5 fw-normal'>2/5</h3>
                        <div className='col-md-8 d-flex flex-column gap-4'>
                            <h2><span className='p-2'><FaCircle size={10} /></span> Add more work details <BsFillFileEarmarkTextFill size={45} className='pb-2' /></h2>
                            <h4 className='ps-4 lead'>Choose the categories you work in:</h4>
                            <div className="form-group ps-4 ">
                                {categories.map((category) => (
                                    <div className="checkbox" key={category.id}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="CategoryIds"
                                                value={category.id}
                                                onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                                                checked={formData.CategoryIds.includes(category.id)}
                                            /> {category.Name}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {formData.CategoryIds.length > 0 && (
                                <div className="form-group ps-4">
                                    <h4 className='ps-4 lead'>Choose the SubCategories you specialize in:</h4>
                                    {visibleSubcategories.map((subcategory) => (
                                        <div className="checkbox" key={subcategory.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="SubCategoryIds"
                                                    value={subcategory.id} // Use subcategory.id for value
                                                    onChange={(e) => handleSubCategoryChange(subcategory.id, e.target.checked)}
                                                    checked={formData.SubCategoryIds.includes(subcategory.id)}
                                                /> {subcategory.Name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <h4 className='ps-4 lead'>Add your Skills</h4>
                            <div className="form-group ps-4 ">
                                <textarea name="Skills" style={{ backgroundColor: '#E0E0E0' }} value={formData.Skills} onChange={handleChange} className="form-control p-3 rounded-3" placeholder="e.g., HTML, CSS, JavaScript" />
                            </div>
                        </div>

                        <div className='d-flex justify-content-between mt-5'>
                            <button type="button" className="btn mb-3 font-weight-bold profilebtn rounded-3 px-5" onClick={prevStep}>Back
                            </button>
                            <button type="button" className="btn mb-3 font-weight-bold profilebtn rounded-3 px-5" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfileStep2;