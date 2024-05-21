import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { useEffect } from 'react'

const sortOptions = [
  { name: 'Businesses', href: '#', current: true },
  { name: 'Influencers', href: '#', current: false },
]

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'Business', label: 'Business', checked: false },
      { value: 'Influencer', label: 'Influencer', checked: false },
    ],
  },
]

const Busfilt = [
  {
    id: 'cate',
    name: 'BusinessCategory',
    options: [
      {
        value: 'Agriculture, Forestry, Fishing, and Hunting',
        label: 'Agriculture, Forestry, Fishing, and Hunting',
        subcategories: [
          { value: 'Crop Production', label: 'Crop Production' },
          { value: 'Animal Production', label: 'Animal Production' },
          { value: 'Forestry and Logging', label: 'Forestry and Logging' },
          { value: 'Fishing, Hunting, and Trapping', label: 'Fishing, Hunting, and Trapping' },
          { value: 'Support Activities for Agriculture and Forestry', label: 'Support Activities for Agriculture and Forestry' },
        ],
      },
      {
        value: 'Mining, Quarrying, and Oil and Gas Extraction',
        label: 'Mining, Quarrying, and Oil and Gas Extraction',
        subcategories: [
          { value: 'Oil and Gas Extraction', label: 'Oil and Gas Extraction' },
          { value: 'Mining (except Oil and Gas)', label: 'Mining (except Oil and Gas)' },
          { value: 'Support Activities for Mining', label: 'Support Activities for Mining' },
        ],
      },
      {
        value: 'Utilities',
        label: 'Utilities',
        subcategories: [
          { value: 'Electric Power Generation, Transmission and Distribution', label: 'Electric Power Generation, Transmission and Distribution' },
          { value: 'Natural Gas Distribution', label: 'Natural Gas Distribution' },
          { value: 'Water, Sewage, and Other Systems', label: 'Water, Sewage, and Other Systems' },
        ],
      },
      {
        value: 'Construction',
        label: 'Construction',
        subcategories: [
          { value: 'Residential Building Construction', label: 'Residential Building Construction' },
          { value: 'Nonresidential Building Construction', label: 'Nonresidential Building Construction' },
          { value: 'Heavy and Civil Engineering Construction', label: 'Heavy and Civil Engineering Construction' },
          { value: 'Specialty Trade Contractors', label: 'Specialty Trade Contractors' },
        ],
      },
      {
        value: 'Manufacturing',
        label: 'Manufacturing',
        subcategories: [
          { value: 'Food Manufacturing', label: 'Food Manufacturing' },
          { value: 'Beverage and Tobacco Product Manufacturing', label: 'Beverage and Tobacco Product Manufacturing' },
          { value: 'Textile Mills', label: 'Textile Mills' },
          { value: 'Textile Product Mills', label: 'Textile Product Mills' },
          { value: 'Apparel Manufacturing', label: 'Apparel Manufacturing' },
          { value: 'Leather and Allied Product Manufacturing', label: 'Leather and Allied Product Manufacturing' },
          { value: 'Wood Product Manufacturing', label: 'Wood Product Manufacturing' },
          { value: 'Paper Manufacturing', label: 'Paper Manufacturing' },
          { value: 'Printing and Related Support Activities', label: 'Printing and Related Support Activities' },
          { value: 'Petroleum and Coal Products Manufacturing', label: 'Petroleum and Coal Products Manufacturing' },
          { value: 'Chemical Manufacturing', label: 'Chemical Manufacturing' },
          { value: 'Plastics and Rubber Products Manufacturing', label: 'Plastics and Rubber Products Manufacturing' },
          { value: 'Nonmetallic Mineral Product Manufacturing', label: 'Nonmetallic Mineral Product Manufacturing' },
          { value: 'Primary Metal Manufacturing', label: 'Primary Metal Manufacturing' },
          { value: 'Fabricated Metal Product Manufacturing', label: 'Fabricated Metal Product Manufacturing' },
          { value: 'Machinery Manufacturing', label: 'Machinery Manufacturing' },
          { value: 'Computer and Electronic Product Manufacturing', label: 'Computer and Electronic Product Manufacturing' },
          { value: 'Electrical Equipment, Appliance, and Component Manufacturing', label: 'Electrical Equipment, Appliance, and Component Manufacturing' },
          { value: 'Transportation Equipment Manufacturing', label: 'Transportation Equipment Manufacturing' },
          { value: 'Furniture and Related Product Manufacturing', label: 'Furniture and Related Product Manufacturing' },
          { value: 'Miscellaneous Manufacturing', label: 'Miscellaneous Manufacturing' },
        ],
      },
      {
        value: 'Wholesale Trade',
        label: 'Wholesale Trade',
        subcategories: [
          { value: 'Merchant Wholesalers, Durable Goods', label: 'Merchant Wholesalers, Durable Goods' },
          { value: 'Merchant Wholesalers, Nondurable Goods', label: 'Merchant Wholesalers, Nondurable Goods' },
          { value: 'Wholesale Electronic Markets and Agents and Brokers', label: 'Wholesale Electronic Markets and Agents and Brokers' },
        ],
      },
      {
        value: 'Retail Trade',
        label: 'Retail Trade',
        subcategories: [
          { value: 'Motor Vehicle and Parts Dealers', label: 'Motor Vehicle and Parts Dealers' },
          { value: 'Furniture and Home Furnishings Stores', label: 'Furniture and Home Furnishings Stores' },
          { value: 'Electronics and Appliance Stores', label: 'Electronics and Appliance Stores' },
          { value: 'Building Material and Garden Equipment and Supplies Dealers', label: 'Building Material and Garden Equipment and Supplies Dealers' },
          { value: 'Food and Beverage Stores', label: 'Food and Beverage Stores' },
          { value: 'Health and Personal Care Stores', label: 'Health and Personal Care Stores' },
          { value: 'Gasoline Stations', label: 'Gasoline Stations' },
          { value: 'Clothing and Clothing Accessories Stores', label: 'Clothing and Clothing Accessories Stores' },
          { value: 'Sporting Goods, Hobby, Musical Instrument, and Book Stores', label: 'Sporting Goods, Hobby, Musical Instrument, and Book Stores' },
          { value: 'General Merchandise Stores', label: 'General Merchandise Stores' },
          { value: 'Miscellaneous Store Retailers', label: 'Miscellaneous Store Retailers' },
          { value: 'Nonstore Retailers', label: 'Nonstore Retailers' },
        ],
      },
      {
        value: 'Transportation and Warehousing',
        label: 'Transportation and Warehousing',
        subcategories: [
          { value: 'Air Transportation', label: 'Air Transportation' },
          { value: 'Rail Transportation', label: 'Rail Transportation' },
          { value: 'Water Transportation', label: 'Water Transportation' },
          { value: 'Truck Transportation', label: 'Truck Transportation' },
          { value: 'Transit and Ground Passenger Transportation', label: 'Transit and Ground Passenger Transportation' },
          { value: 'Pipeline Transportation', label: 'Pipeline Transportation' },
          { value: 'Scenic and Sightseeing Transportation', label: 'Scenic and Sightseeing Transportation' },
          { value: 'Support Activities for Transportation', label: 'Support Activities for Transportation' },
          { value: 'Postal Service', label: 'Postal Service' },
          { value: 'Couriers and Messengers', label: 'Couriers and Messengers' },
          { value: 'Warehousing and Storage', label: 'Warehousing and Storage' },
        ],
      },
      {
        value: 'Information',
        label: 'Information',
        subcategories: [
          { value: 'Publishing Industries (except Internet)', label: 'Publishing Industries (except Internet)' },
          { value: 'Motion Picture and Sound Recording Industries', label: 'Motion Picture and Sound Recording Industries' },
          { value: 'Broadcasting (except Internet)', label: 'Broadcasting (except Internet)' },
          { value: 'Telecommunications', label: 'Telecommunications' },
          { value: 'Data Processing, Hosting, and Related Services', label: 'Data Processing, Hosting, and Related Services' },
          { value: 'Other Information Services', label: 'Other Information Services' },
        ],
      },
      {
        value: 'Finance and Insurance',
        label: 'Finance and Insurance',
        subcategories: [
          { value: 'Monetary Authorities-Central Bank', label: 'Monetary Authorities-Central Bank' },
          { value: 'Credit Intermediation and Related Activities', label: 'Credit Intermediation and Related Activities' },
          { value: 'Securities, Commodity Contracts, and Other Financial Investments and Related Activities', label: 'Securities, Commodity Contracts, and Other Financial Investments and Related Activities' },
          { value: 'Insurance Carriers and Related Activities', label: 'Insurance Carriers and Related Activities' },
          { value: 'Funds, Trusts, and Other Financial Vehicles', label: 'Funds, Trusts, and Other Financial Vehicles' },
        ],
      },
      {
        value: 'Real Estate and Rental and Leasing',
        label: 'Real Estate and Rental and Leasing',
        subcategories: [
          { value: 'Real Estate', label: 'Real Estate' },
          { value: 'Rental and Leasing Services', label: 'Rental and Leasing Services' },
          { value: 'Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)', label: 'Lessors of Nonfinancial Intangible Assets (except Copyrighted Works)' },
        ],
      },
      {
        value: 'Professional, Scientific, and Technical Services',
        label: 'Professional, Scientific, and Technical Services',
        subcategories: [
          { value: 'Legal Services', label: 'Legal Services' },
          { value: 'Accounting, Tax Preparation, Bookkeeping, and Payroll Services', label: 'Accounting, Tax Preparation, Bookkeeping, and Payroll Services' },
          { value: 'Architectural, Engineering, and Related Services', label: 'Architectural, Engineering, and Related Services' },
          { value: 'Specialized Design Services', label: 'Specialized Design Services' },
          { value: 'Computer Systems Design and Related Services', label: 'Computer Systems Design and Related Services' },
          { value: 'Management, Scientific, and Technical Consulting Services', label: 'Management, Scientific, and Technical Consulting Services' },
          { value: 'Scientific Research and Development Services', label: 'Scientific Research and Development Services' },
          { value: 'Advertising, Public Relations, and Related Services', label: 'Advertising, Public Relations, and Related Services' },
          { value: 'Other Professional, Scientific, and Technical Services', label: 'Other Professional, Scientific, and Technical Services' },
        ],
      },
      {
        value: 'Management of Companies and Enterprises',
        label: 'Management of Companies and Enterprises',
        subcategories: [
          { value: 'Offices of Bank Holding Companies', label: 'Offices of Bank Holding Companies' },
          { value: 'Offices of Other Holding Companies', label: 'Offices of Other Holding Companies' },
        ],
      },
      {
        value: 'Administrative and Support and Waste Management and Remediation Services',
        label: 'Administrative and Support and Waste Management and Remediation Services',
        subcategories: [
          { value: 'Administrative and Support Services', label: 'Administrative and Support Services' },
          { value: 'Waste Management and Remediation Services', label: 'Waste Management and Remediation Services' },
        ],
      },
      {
        value: 'Educational Services',
        label: 'Educational Services',
        subcategories: [
          { value: 'Elementary and Secondary Schools', label: 'Elementary and Secondary Schools' },
          { value: 'Junior Colleges', label: 'Junior Colleges' },
          { value: 'Colleges, Universities, and Professional Schools', label: 'Colleges, Universities, and Professional Schools' },
          { value: 'Business Schools and Computer and Management Training', label: 'Business Schools and Computer and Management Training' },
          { value: 'Technical and Trade Schools', label: 'Technical and Trade Schools' },
          { value: 'Other Schools and Instruction', label: 'Other Schools and Instruction' },
          { value: 'Educational Support Services', label: 'Educational Support Services' },
        ],
      },
      {
        value: 'Health Care and Social Assistance',
        label: 'Health Care and Social Assistance',
        subcategories: [
          { value: 'Ambulatory Health Care Services', label: 'Ambulatory Health Care Services' },
          { value: 'Hospitals', label: 'Hospitals' },
          { value: 'Nursing and Residential Care Facilities', label: 'Nursing and Residential Care Facilities' },
          { value: 'Social Assistance', label: 'Social Assistance' },
        ],
      },
      {
        value: 'Arts, Entertainment, and Recreation',
        label: 'Arts, Entertainment, and Recreation',
        subcategories: [
          { value: 'Performing Arts, Spectator Sports, and Related Industries', label: 'Performing Arts, Spectator Sports, and Related Industries' },
          { value: 'Museums, Historical Sites, and Similar Institutions', label: 'Museums, Historical Sites, and Similar Institutions' },
          { value: 'Amusement, Gambling, and Recreation Industries', label: 'Amusement, Gambling, and Recreation Industries' },
        ],
      },
      {
        value: 'Accommodation and Food Services',
        label: 'Accommodation and Food Services',
        subcategories: [
          { value: 'Accommodation', label: 'Accommodation' },
          { value: 'Food Services and Drinking Places', label: 'Food Services and Drinking Places' },
        ],
      },
      {
        value: 'Other Services (except Public Administration)',
        label: 'Other Services (except Public Administration)',
        subcategories: [
          { value: 'Repair and Maintenance', label: 'Repair and Maintenance' },
          { value: 'Personal and Laundry Services', label: 'Personal and Laundry Services' },
          { value: 'Religious, Grant-making, Civic, Professional, and Similar Organizations', label: 'Religious, Grant-making, Civic, Professional, and Similar Organizations' },
          { value: 'Private Households', label: 'Private Households' },
        ],
      },
      {
        value: 'Public Administration',
        label: 'Public Administration',
        subcategories: [
          { value: 'Executive, Legislative, and Other General Government Support', label: 'Executive, Legislative, and Other General Government Support' },
          { value: 'Justice, Public Order, and Safety Activities', label: 'Justice, Public Order, and Safety Activities' },
          { value: 'Administration of Human Resource Programs', label: 'Administration of Human Resource Programs' },
          { value: 'Administration of Environmental Quality Programs', label: 'Administration of Environmental Quality Programs' },
          { value: 'Administration of Housing Programs, Urban Planning, and Community Development', label: 'Administration of Housing Programs, Urban Planning, and Community Development' },
          { value: 'Administration of Economic Programs', label: 'Administration of Economic Programs' },
          { value: 'Space Research and Technology', label: 'Space Research and Technology' },
          { value: 'National Security and International Affairs', label: 'National Security and International Affairs' },
        ],
      },
    ],
  },
  {
    id: 'strength',
    name: 'Strength',
    options: [
      { value: 'small', label: 'Small-Scale', checked: false },
      { value: 'medium', label: 'Medium-Scale', checked: false },
      { value: 'large', label: 'Large-Scale', checked: false },
      { value: 'enterprise', label: 'Enterprise', checked: false },
    ],
  },
];




const Influencerfilt = [
  {
    id: 'cate',
    name: 'InfluencerCategory',
    options: [
      { value: 'models', label: 'Models', checked: false },
      { value: 'artists', label: 'Artists', checked: false },
    ],
  },
  {
    id: 'Follower',
    name: 'Follower Count',
    options: [
      { value: '1001-10000', label: '1001 - 10,000', checked: false },
      { value: '10001-100000', label: '10,001 - 100,000', checked: false },
      { value: '100001-1000000', label: '100,001 - 1,000,000', checked: false },
      { value: '1000001+', label: '1,000,001+', checked: false },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Example() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [showBCategory, setShowBCategory] = useState(false)
  const [showICategory, setShowICategory] = useState(false)

  const [location, setLocation] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  const handleFilterChange = (event) => {
    const { value, checked } = event.target

    if (value === 'Business') {
      setShowBCategory(checked)
    }
    if (value === 'Influencer') {
      setShowICategory(checked)
    }
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
    setSelectedSubcategory('')
  }

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value)
  }

  const selectedCategoryObject = Busfilt[0].options.find(
    (category) => category.value === selectedCategory
  )

  return (
    <div className="right-0 top-25 h-25 w-64 bg-gray-200 p-4 overflow-y-auto">
      <div className='right-0'>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-black pb-6 pt-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Filter By</h2>
          </div>
          <div className="flex items-center pt-4">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-4">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-black text-indigo-600 focus:ring-indigo-500"
                                  onChange={handleFilterChange}
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </div>
            {showBCategory && (
              <form className="hidden lg:block">
                {Busfilt.map((section) => (
                  <Disclosure as="div" key={section.id} className="py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  value={option.value}
                                  type="checkbox"
                                  checked={selectedCategory === option.value}
                                  className="h-4 w-4 rounded border-black text-indigo-600 focus:ring-indigo-500"
                                  onChange={handleCategoryChange}
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                {selectedCategory && selectedCategoryObject && (
                  <div className="py-6">
                    <h3 className="-my-3 flow-root">
                      <span className="font-medium text-gray-900">Subcategory</span>
                    </h3>
                    <div className="pt-6 space-y-4">
                      {selectedCategoryObject.subcategories.map((subcategory, subIdx) => (
                        <div key={subcategory.value} className="flex items-center">
                          <input
                            id={`filter-subcategory-${subIdx}`}
                            name="subcategory[]"
                            value={subcategory.value}
                            type="checkbox"
                            checked={selectedSubcategory === subcategory.value}
                            className="h-4 w-4 rounded border-black text-indigo-600 focus:ring-indigo-500"
                            onChange={handleSubcategoryChange}
                          />
                          <label
                            htmlFor={`filter-subcategory-${subIdx}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {subcategory.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center py-3">
                  <label htmlFor="location" className="mr-2 text-sm text-gray-900">Location:</label>
                </div>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={handleLocationChange}
                  className="w-32 p-1 text-sm border border-gray-300 rounded-md"
                />
              </form>
            )}
            {showICategory && (
              <form className="hidden lg:block">
                {Influencerfilt.map((section) => (
                  <Disclosure as="div" key={section.id} className="py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-black text-indigo-600 focus:ring-indigo-500"
                                  onChange={handleFilterChange}
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <div className="flex items-center py-3">
                  <label htmlFor="location" className="mr-2 text-sm text-gray-900">Location:</label>
                </div>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={handleLocationChange}
                  className="w-32 p-1 text-sm border border-gray-300 rounded-md"
                />
              </form>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}




