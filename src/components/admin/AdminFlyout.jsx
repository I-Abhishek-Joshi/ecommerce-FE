import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart
} from "@mui/icons-material";
import styled from "styled-components";
import "../../globalStyle.css"

const Sidebar = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  background-color: #c1e2e2;
  position: sticky;
  top: 50px;
`;

const SidebarWrapper = styled.div`
  padding: 20px;
  color: #555;
`;

const SidebarMenu = styled.div`
  margin-bottom: 10px;
`;

const SidebarTitle = styled.div`
  font-size: 13px;
  color: rgb(187, 186, 186);
`;

const SidebarList = styled.div`
  list-style: none;
  padding: 5px;
`;

const SidebarListItem = styled.div`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;

  &:hover {
    background-color: rgb(240, 240, 255);
  }
  &:active {
    background-color: rgb(240, 240, 255);
  }
`;

const AdminFlyout = () => {
  return (
    <Sidebar>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarTitle>Dashboard</SidebarTitle>
          <SidebarList>
              <SidebarListItem>
                <LineStyle className="sidebarIcon" />
                Home
              </SidebarListItem>
            <SidebarListItem>
              <Timeline className="sidebarIcon" />
              Analytics
            </SidebarListItem>
            <SidebarListItem>
              <TrendingUp className="sidebarIcon" />
              Sales
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarTitle>Quick Menu</SidebarTitle>
          <SidebarList>
              <SidebarListItem>
                <PermIdentity className="sidebarIcon" />
                Users
              </SidebarListItem>
              <SidebarListItem>
                <Storefront className="sidebarIcon" />
                Products
              </SidebarListItem>
            <SidebarListItem>
              <AttachMoney className="sidebarIcon" />
              Transactions
            </SidebarListItem>
            <SidebarListItem>
              <BarChart className="sidebarIcon" />
              Reports
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </SidebarWrapper>
    </Sidebar>
  );
}

export default AdminFlyout;
