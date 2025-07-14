import chefClaudeLogo from "../assets/chef-claude-icon.png"

export default function Header() {
    return (
        <header className="header-container">
            <img className="header-icon"
                src={chefClaudeLogo}
                alt="cheg-claude-icon"
            />
            <span className="header-title">Chef Claude</span>
        </header>
    )
}