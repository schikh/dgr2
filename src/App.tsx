import { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import type { DataFile } from './types';

/**
 * Main DGR Exclusion Application Component
 * Displays companies, goods, and manages exclusions
 */
function App() {
  // State management
  const [data, setData] = useState<DataFile | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>('default');
  const [selectedGoods, setSelectedGoods] = useState<string[]>([]);
  const [footerText, setFooterText] = useState<string>('');

  /**
   * Load data from goods.json on component mount
   */
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}goods.json`)
      .then(response => response.json())
      .then((jsonData: DataFile) => {
        setData(jsonData);
      })
      .catch(error => {
        console.error('Error loading goods.json:', error);
      });
  }, []);

  /**
   * Filter exclusions by selected company
   */
  const currentExclusions = useMemo(() => {
    if (!data) return [];
    return data.exclusions.filter(ex => ex.company === 'default' || ex.company === selectedCompany);
  }, [data, selectedCompany]);

  /**
   * Check if a good has any exclusion conflicts with selected goods
   */
  const hasExclusion = (goodName: string): boolean => {
    return currentExclusions.some(ex => {
      return (
        (ex.p1 === goodName && selectedGoods.includes(ex.p2)) ||
        (ex.p2 === goodName && selectedGoods.includes(ex.p1))
      );
    });
  };

  /**
   * Get all exclusion texts for current selection
   */
  const getExclusionTexts = (): string[] => {
    const texts: string[] = [];
    currentExclusions.forEach(ex => {
      if (selectedGoods.includes(ex.p1) && selectedGoods.includes(ex.p2)) {
        texts.push(ex.text);
      }
    });
    return texts;
  };

  /**
   * Handle good selection toggle
   */
  const toggleGoodSelection = (goodName: string) => {
    setSelectedGoods(prev => {
      if (prev.includes(goodName)) {
        // Remove from selection
        return prev.filter(g => g !== goodName);
      } else {
        // Add to selection
        return [...prev, goodName];
      }
    });
  };

  /**
   * Update footer text when selected goods change
   */
  useEffect(() => {
    const texts = getExclusionTexts();
    setFooterText(texts.join(' | '));
  }, [selectedGoods, currentExclusions]);

  /**
   * Get image path for a good
   */
  const getGoodImagePath = (goodName: string): string => {
    // Map good names to their image files
    const imageMap: { [key: string]: string } = {
      'RCX-CL1.3C': 'RCX-1.3C.png',
      'RGX-CL1.3G': 'RGX-1.3G.png',
      'RXC-CL1.4C': 'RXC-1.4C.png',
      'RXD-CL1.4D': 'RXD-1.4D.png',
      'RXE-CL1.4E': 'RXE-1.4E.png',
      'RXG-CL1.4G': 'RXG-1.4G.png',
      'RXB-CL1.4B': 'RXB-1.4B.png',
      'RXG-CL1.4S': 'RXG-1.4S.png',
      'RFG-CL2.1': 'C2-1.png',
      'RNG-CL2.2': 'C2-2.png',
      'RCL-CL2.2': 'C2-2.png',
      'RPG-CL2.3': 'RPG-2.3.png',
      'RFL-CL3': 'C3-3.png',
      'RFS-4.1': 'C4-1.png',
      'RSC-4.2': 'C4-2.png',
      'RFW-4.3': 'C4-3.png',
      'ROX-5.1': 'C5-1.png',
      'ROP-5.2': 'C5-2.png',
      'RPB-6.1': 'RPB-6.1.png',
      'RIS-6.2': 'RIS-6.2.png',
      'RDS-6.2': 'C6-2.png',
      'RRW-I-7': 'C7-1-1.png',
      'RRE-7': 'C7-1-2.png',
      'RRY-II-7': 'C7-1-2.png',
      'RRY-III-7': 'C7-1-3.png',
      'RCM-8': 'C8.png',
      'C9-RMD': 'C9-RMD.png',
      'RBI-9': 'C9-ICE.png',
      'RBM-9': 'C9-MAG.png',
      'RLI-9': 'C9-ICE.png',
      'RLM-9': 'C9-MAG.png',
      'C9-MAG': 'C9-MAG.png',
      'ICE-CL9': 'C9-ICE.png',
      'AVI': 'AVI.png',
      'PEM/PEF/PES': 'PEM.png',
      'FIL': 'FIL.png',
      'HEG': 'HEG.png',
      'HUM': 'HUM.png',
      'LHO': 'LHO.png',
      'PER': 'PER.png',
      'PIL': 'PER.png'
    };

    return `/goods/${imageMap[goodName] || 'default.png'}`;
  };

  /**
   * Get image path for a company
   */
  const getCompanyImagePath = (companyName: string): string => {
    return `/companies/${companyName === 'default' ? 'default.png' : companyName + '.png'}`;
  };

  // Loading state
  if (!data) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="mb-0">DGR Exclusion</h1>
      </header>

      {/* Company Selector */}
      <div className="company-selector">
        <div className="company-list">
          {data.companies.map(company => (
            <div
              key={company}
              className={`company-item ${selectedCompany === company ? 'selected' : ''}`}
              onClick={() => setSelectedCompany(company)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${company}`}
            >
              <img
                src={getCompanyImagePath(company)}
                alt={company}
                className="company-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `/companies/${company}.png`;
                }}
              />
              <span className="company-label">{company}</span>
            </div>
          ))}
        </div>
        <button
          className="clear-button"
          onClick={() => setSelectedGoods([])}
          title="Clear all selected goods"
          aria-label="Clear all selected goods"
        >
          🗑️
        </button>
      </div>

      {/* Body with two panels */}
      <div className="app-body">
        {/* Left Panel - All Goods */}
        <div className="goods-panel left-panel">
          <div className="goods-grid">
            {data.goods.map(good => {
              const isSelected = selectedGoods.includes(good);
              //const hasConflict = hasExclusion(good);
              
              return (
                <div
                  key={good}
                  className={`good-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleGoodSelection(good)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${isSelected ? 'Deselect' : 'Select'} ${good}`}
                  title={good}
                >
                  <img
                    src={getGoodImagePath(good)}
                    alt={good}
                    className="good-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/goods/default.png';
                    }}
                  />
                  <span className="good-label">{good}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel - Selected Goods */}
        <div className="goods-panel right-panel">
          {selectedGoods.length === 0 ? (
            <div className="empty-state">
              <p>No goods selected</p>
              <small>Click on goods to add them</small>
            </div>
          ) : (
            <div className="selected-goods-list">
              {[...selectedGoods]
                .sort((a, b) => {
                  const aHasConflict = hasExclusion(a);
                  const bHasConflict = hasExclusion(b);
                  // Items with conflicts first (true > false in descending order)
                  if (aHasConflict && !bHasConflict) return -1;
                  if (!aHasConflict && bHasConflict) return 1;
                  return 0;
                })
                .map(good => {
                const hasConflict = hasExclusion(good);
                
                return (
                  <div
                    key={good}
                    className={`selected-good-item ${hasConflict ? 'excluded' : ''}`}
                    onClick={() => toggleGoodSelection(good)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Remove ${good}`}
                    title={`${good}${hasConflict ? ' - Has exclusion!' : ''}`}
                  >
                    <img
                      src={getGoodImagePath(good)}
                      alt={good}
                      className="good-image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/goods/default.png';
                      }}
                    />
                    <span className="good-label">{good}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        {footerText ? (
          <div className="alert alert-danger mb-0" role="alert">
            <strong>Exclusion Warning:</strong> {footerText}
          </div>
        ) : (
          <div className="text-muted">No exclusions detected</div>
        )}
      </footer>
    </div>
  );
}

export default App;
