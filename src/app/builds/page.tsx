function BuildsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl mb-2">
          Spark Inquisitor - The Lightning Legion
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <span>By: LightningMaster</span>
          <span>Updated: 2025 League</span>
          <span className="flex items-center gap-1">Lightning</span>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-xl mb-4">Build Overview</h2>
        <p className="mb-4">
          Spark remains one of the most versatile skills in Path of Exile 2,
          capable of both clear and single-target damage. This build leverages
          the new weapon enhancement system to create a symphony of lightning
          that fills the screen with deadly projectiles. Using the Inquisitors
          critical strike potential, we ignore enemy resistances to achieve
          consistent damage output.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <h3>Damage</h3>
            </div>
            <p className="text-sm">2-3M DPS per Spark</p>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <h3>Defense</h3>
            </div>
            <p className="text-sm">75/75 Block, 5k Life, 2k ES</p>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <h3>Investment</h3>
            </div>
            <p className="text-sm">Medium (15-20 Divine)</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl mb-4">Core Items</h2>
        <div className="p-4">
          <ul className="space-y-2">
            <li>Weapon: Call of the Void Staff (Lightning Enchant)</li>
            <li>Body: 6L Shroud of the Lightless</li>
            <li>Amulet: + 1 Lightning Skills, Crit Multi</li>
            <li>Ring 1 & 2: Circle of Fear</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-4">Leveling Guide</h2>
        <div>
          <p className="mb-4">
            Start with Spark from level 1. The skill feels clunky initially but
            improves dramatically with cast speed. Focus on lightning damage
            nodes early, then transition into crit around level 45-50 when you
            can equip better gear.
          </p>
          <div className="p-4 text-sm">
            <p className="mb-2">Gem Links (Early):</p>
            <p>Spark - Added Lightning - Faster Casting - Pierce</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BuildsPage;
