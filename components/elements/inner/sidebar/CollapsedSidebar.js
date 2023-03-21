import React,{ useState, useRef, useContext } from 'react';
import { 
    CSidebar, 
    CSidebarBrand, 
    CSidebarFooter, 
    CSidebarNav,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CDropdownItemPlain,
    CDropdownDivider
} from '@coreui/react'
import { 
    FaFeatherAlt,
    FaBuilding,
    FaPlus,
    FaChevronRight,
    FaChevronLeft
} from 'react-icons/fa'
import {
  LOADING,
  SET_ADD_CONTENT_TYPE_MODAL,
  SET_HEADER_DROPDOWN,
} from "@/lib/actions";
import Link from 'next/link';
import 'simplebar/dist/simplebar.min.css'
import useSidebarReducer from "@/components/reducers/sidebarReducer";
import AppModal from "@/components/klaudsolcms/AppModal";
import CollectionTypeBody from "@/components/klaudsolcms/modals/modal_body/CollectionTypeBody";
import SidebarFooterIcon from '@/components/klaudsolcms/dropdown/SidebarFooterIcon';
import AppButtonSpinner from '@/components/klaudsolcms/AppButtonSpinner';
import RootContext from '@/components/contexts/RootContext';
import { useRouter } from 'next/router'

const CollapsedSidebar = ({sidebarButtons, firstName, lastName, defaultEntityType, router, setCollapse}) => {
  const { state: rootState, dispatch: rootDispatch } = useContext(RootContext);
  const [state, setState] = useSidebarReducer();

  const formRef = useRef();
  const { pathname } = useRouter();

  const onSubmit = () => {
    if (!formRef.current) return;

    formRef.current.handleSubmit();
  }
  
  return (
    <CSidebar
     className='collapsed-sidebar'
      position='fixed'
      visible={true}
      narrow
      onVisibleChange={() => {
        //dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand to="/admin" className='sidebar_brand'>
        {/*<CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
        */}
        <CDropdown 
          className="sidebar_header--dropdown"
          direction="dropend"
          onShow={() => setState(SET_HEADER_DROPDOWN, true)}
          onHide={() => setState(SET_HEADER_DROPDOWN, false)}
        >
          <CDropdownToggle 
              className="sidebar_header--toggle" 
              variant="ghost" 
              caret={false} 
              size="lg"
              split
          >
              {state.headerDropdown && <FaChevronRight />}
              {rootState.entityTypes.length !== 0 && 
                  pathname.includes('content-type-builder') &&
                  !state.headerDropdown &&
                  <FaBuilding /> }
              {rootState.entityTypes.length !== 0 && 
                  (!pathname.includes('content') ||
                  pathname.includes('content-manager')) &&
                  !state.headerDropdown &&
                  <FaFeatherAlt /> }
              {rootState.entityTypes.length === 0 && <AppButtonSpinner /> }
          </CDropdownToggle>
          <CDropdownMenu className="sidebar_collapse_header--menu">
              <CDropdownItemPlain className="sidebar_header--item">
                  <Link href={`/admin/content-manager/${defaultEntityType}`}>
                     <FaFeatherAlt /> Content Manager
                  </Link>
              </CDropdownItemPlain>
              <CDropdownDivider />
              <CDropdownItemPlain className="sidebar_header--item">
                  <Link href={`/admin/content-type-builder/${defaultEntityType}`}>
                      <FaBuilding /> Content-type Builder
                  </Link>
              </CDropdownItemPlain>
          </CDropdownMenu>
         </CDropdown>
      </CSidebarBrand>

      <CSidebarNav className="sidebar_nav">
        <div className='collapsed-sidebar-items'>
            <div>
                {sidebarButtons.map((button, i) => (
                 <Link key={i} href={button.title === 'Content Manager' || button.title === 'Content-Type Builder' ? button.path + `${defaultEntityType}` : button.path} passHref>
                  <div className='collapsed-buttons' key={i}>
                    <button className={router.asPath?.includes?.(button.path) ? 'sidebar_buttons_active' : 'sidebar_buttons'} passHref>{button.icon}</button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
      </CSidebarNav>

      {pathname.includes('content-type-builder') && 
       <button 
          className="content_create_button__collapsed--non_submenu" 
          onClick={() => setState(SET_ADD_CONTENT_TYPE_MODAL, true)}
        >
          <FaPlus className="content_create_icon"/>
        </button>
      }

      <div className='d-flex align-items-start justify-content-start mx-0 px-0 py-0 mx-2'>
      <SidebarFooterIcon title={`${firstName.charAt(0)}${lastName.charAt(0)}`} />
      <button className='sidebar_footer_collapse' onClick={() => setCollapse(false)}> <FaChevronRight /> </button>
      </div>

      <AppModal
          show={state.showAddContentTypeModal}
          onClose={() => setState(SET_ADD_CONTENT_TYPE_MODAL, false)}
          onClick={onSubmit}
          modalTitle="Create a collection type"
          buttonTitle="Continue"
          isLoading={state.isLoading}
      >
          <CollectionTypeBody 
              formRef={formRef} 
              setModal={(value) => setState(SET_ADD_CONTENT_TYPE_MODAL, value)} 
              setLoading={(value) => setState(LOADING, value)} 
          />
      </AppModal>
   

    </CSidebar>
  )
}

export default React.memo(CollapsedSidebar)
