import { useNavigate } from "react-router-dom";
import "./OverviewCard.scss";

interface OverviewCardProps {
  label: string;
  title: string;
  total: string;
  logo: React.ReactNode;
}

const OverviewCard = ({
  logo,
  title = "name",
  total = "Rs 10500",
  label = "total stocks 5",
}: OverviewCardProps) => {
  const navigate = useNavigate();

  const handleNavigate = (title: string) => {
    navigate(title.toLowerCase());
  };

  /**
   * TSX
   */
  return (
    <div className="overview-card" onClick={() => handleNavigate(title)}>
      <div className="container">
        <div className="top">
          <div className="left">{logo}</div>
          <div className="right">
            <p className="title">{title}</p>
            <p className="total">{total}</p>
          </div>
        </div>
        <div className="line"></div>
        <div className="bottom">{label}</div>
      </div>
    </div>
  );
};

export default OverviewCard;
