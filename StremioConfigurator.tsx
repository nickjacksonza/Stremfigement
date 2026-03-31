import React, { useState } from 'react';
import { Copy, Download, Key, Puzzle, Filter, ArrowUpDown, Layout, Settings, X, GripVertical } from 'lucide-react';

export default function StremioConfigurator() {
  const [activeTab, setActiveTab] = useState('services');
  
  const [services, setServices] = useState({
    realDebridApiKey: '',
    rpdbApiKey: 't0-free-rpdb',
    tmdbReadAccessToken: '',
    tmdbApiKey: '',
    tvdbApiKey: '',
    fanartApiKey: '',
    mdblistApiKey: '',
    geminiApiKey: '',
    tastediveApiKey: ''
  });

  const [addons, setAddons] = useState({
    streams: ['Torznab', 'Newznab', 'Comet', 'Sootio', 'Zilean', 'Knaben', 'TorrentGalaxy', 'Bitmagnet', 'Prowlarr', 'Jackett', 'NZBHydra', 'Stremio GDrive', 'TorBox Search'],
    subtitles: ['SubHero'],
    metadata: ['Streaming Catalogs', 'AI Search', 'More Like This'],
    misc: ['AIOStreams']
  });

  const [filters, setFilters] = useState({
    cachedOnly: true,
    no4K: true,
    atLeastHD: true,
    noLowQuality: true,
    exclude3D: true,
    atLeast51: true,
    english: true,
    includeDubbed: false,
    includeAnime: false,
    otherLanguages: '',
    atLeast20Seeders: false,
    ageAny: true,
    ageLessThanWeek: false,
    matchingEnabled: true,
    excludedKeywords: '',
    preferredKeywords: '',
    regexLoaded: false,
    globalSizeLimit: 20,
    resolutionLimit: 2,
    globalLimit: 10,
    serviceLimit: '',
    addonLimit: '',
    qualityLimit: '',
    deduplicatorEnabled: true,
    digitalReleaseFilterEnabled: true
  });

  const [sorting, setSorting] = useState([
    { name: 'Cached in Debrid', order: 'desc' },
    { name: 'Resolution and Quality', order: 'desc' },
    { name: 'Library', order: 'asc' },
    { name: 'Regex Patterns', order: 'desc' },
    { name: 'Stream Type', order: 'desc' },
    { name: 'Visual and Audio Tags', order: 'desc' },
    { name: 'Encoding', order: 'desc' },
    { name: 'Language', order: 'desc' },
    { name: 'Size', order: 'asc' }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);

  const [formatter, setFormatter] = useState('Google Drive');
  
  const [misc, setMisc] = useState({
    preCacheNextEp: true,
    autoPlay: true,
    areYouStillThere: true
  });

  const removeAddon = (category, addon) => {
    setAddons({
      ...addons,
      [category]: addons[category].filter(a => a !== addon)
    });
  };

  const loadRegexPatterns = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Vidhin05/Releases-Regex/main/merged-regexes.json');
      await response.json();
      setFilters({ ...filters, regexLoaded: true });
      alert('Regex patterns loaded successfully!');
    } catch (error) {
      alert('Failed to load regex patterns');
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;
    const newSorting = [...sorting];
    const item = newSorting[draggedItem];
    newSorting.splice(draggedItem, 1);
    newSorting.splice(index, 0, item);
    setSorting(newSorting);
    setDraggedItem(index);
  };

  const toggleSortOrder = (index) => {
    const newSorting = [...sorting];
    newSorting[index].order = newSorting[index].order === 'asc' ? 'desc' : 'asc';
    setSorting(newSorting);
  };

  const generateConfig = () => {
    return { services, addons, filters, sorting, formatter, misc };
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(generateConfig(), null, 2));
  };

  const downloadJSON = () => {
    const json = JSON.stringify(generateConfig(), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stremio-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white">Stremio Add-on Configurator</h1>
            <p className="text-purple-100 mt-1">Configure your custom Stremio setup</p>
          </div>

          <div className="flex border-b border-gray-700 overflow-x-auto">
            {['services', 'addons', 'filters', 'sorting', 'formatter', 'misc', 'install'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gray-800 text-white border-b-2 border-purple-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6 max-h-[600px] overflow-y-auto">
            {activeTab === 'services' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">API Keys</h2>
                {Object.keys(services).map(key => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    <input
                      type={key.includes('Key') || key.includes('Token') ? 'password' : 'text'}
                      value={services[key]}
                      onChange={(e) => setServices({ ...services, [key]: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'addons' && (
              <div className="space-y-6">
                {Object.keys(addons).map(category => (
                  <div key={category} className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-white mb-3 capitalize">{category}</h3>
                    <div className="space-y-2">
                      {addons[category].map(addon => (
                        <div key={addon} className="flex items-center justify-between bg-gray-700 px-4 py-2 rounded">
                          <span className="text-white">{addon}</span>
                          <button onClick={() => removeAddon(category, addon)} className="text-red-400 hover:text-red-300">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'filters' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Stream Filters</h2>
                
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={filters.cachedOnly} onChange={(e) => setFilters({ ...filters, cachedOnly: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">Cached-only (Debrid)</span>
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={filters.no4K} onChange={(e) => setFilters({ ...filters, no4K: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">No 4K (exclude above 1080p)</span>
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={filters.atLeastHD} onChange={(e) => setFilters({ ...filters, atLeastHD: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">At least HD (exclude below 720p)</span>
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={filters.noLowQuality} onChange={(e) => setFilters({ ...filters, noLowQuality: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">No low quality (CAM, TS, TC, SCR{filters.no4K ? ', BluRay REMUX, BluRay' : ''})</span>
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={filters.exclude3D} onChange={(e) => setFilters({ ...filters, exclude3D: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">Exclude 3D</span>
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={filters.atLeast51} onChange={(e) => setFilters({ ...filters, atLeast51: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">At least 5.1 audio (prefer 5.1, 7.1)</span>
                </label>

                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-lg font-bold text-white mb-3">Language</h3>
                  <label className="flex items-center gap-3 mb-2">
                    <input type="checkbox" checked={filters.english} onChange={(e) => setFilters({ ...filters, english: e.target.checked })} className="w-5 h-5" />
                    <span className="text-gray-300">English</span>
                  </label>
                  <label className="flex items-center gap-3 mb-2">
                    <input type="checkbox" checked={filters.includeDubbed} onChange={(e) => setFilters({ ...filters, includeDubbed: e.target.checked })} className="w-5 h-5" />
                    <span className="text-gray-300">Include Dubbed/Dual/Multi</span>
                  </label>
                  <label className="flex items-center gap-3 mb-2">
                    <input type="checkbox" checked={filters.includeAnime} onChange={(e) => setFilters({ ...filters, includeAnime: e.target.checked })} className="w-5 h-5" />
                    <span className="text-gray-300">Include Anime (Japanese, Korean)</span>
                  </label>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Other Languages (comma-separated)</label>
                    <input
                      type="text"
                      value={filters.otherLanguages}
                      onChange={(e) => setFilters({ ...filters, otherLanguages: e.target.value })}
                      placeholder="Spanish, French, Portuguese"
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={filters.atLeast20Seeders} onChange={(e) => setFilters({ ...filters, atLeast20Seeders: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">At least 20 seeders</span>
                </label>

                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-lg font-bold text-white mb-3">Age</h3>
                  <label className="flex items-center gap-3 mb-2">
                    <input type="radio" checked={filters.ageAny} onChange={() => setFilters({ ...filters, ageAny: true, ageLessThanWeek: false })} className="w-5 h-5" />
                    <span className="text-gray-300">Any</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" checked={filters.ageLessThanWeek} onChange={() => setFilters({ ...filters, ageAny: false, ageLessThanWeek: true })} className="w-5 h-5" />
                    <span className="text-gray-300">Less than one week</span>
                  </label>
                </div>

                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={filters.matchingEnabled} onChange={(e) => setFilters({ ...filters, matchingEnabled: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">Enable Matching</span>
                </label>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Excluded Keywords</label>
                  <input
                    type="text"
                    value={filters.excludedKeywords}
                    onChange={(e) => setFilters({ ...filters, excludedKeywords: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Preferred Keywords</label>
                  <input
                    type="text"
                    value={filters.preferredKeywords}
                    onChange={(e) => setFilters({ ...filters, preferredKeywords: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
                  />
                </div>

                <div>
                  <button
                    onClick={loadRegexPatterns}
                    className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                  >
                    {filters.regexLoaded ? '✓ Regex Patterns Loaded' : 'Load Preferred Regex Patterns'}
                  </button>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Global Size Limit (GB)</label>
                  <select
                    value={filters.globalSizeLimit}
                    onChange={(e) => setFilters({ ...filters, globalSizeLimit: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
                  >
                    {[4, 8, 12, 16, 20, 24, 28, 32, 36, 40].map(size => (
                      <option key={size} value={size}>{size} GB</option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-lg font-bold text-white mb-3">Result Limits</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Resolution Limit</label>
                      <input type="number" value={filters.resolutionLimit} onChange={(e) => setFilters({ ...filters, resolutionLimit: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Global Limit</label>
                      <input type="number" value={filters.globalLimit} onChange={(e) => setFilters({ ...filters, globalLimit: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Service Limit</label>
                      <input type="number" value={filters.serviceLimit} onChange={(e) => setFilters({ ...filters, serviceLimit: e.target.value })} placeholder="Optional" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Addon Limit</label>
                      <input type="number" value={filters.addonLimit} onChange={(e) => setFilters({ ...filters, addonLimit: e.target.value })} placeholder="Optional" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Quality Limit</label>
                      <input type="number" value={filters.qualityLimit} onChange={(e) => setFilters({ ...filters, qualityLimit: e.target.value })} placeholder="Optional" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600" />
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={filters.deduplicatorEnabled} onChange={(e) => setFilters({ ...filters, deduplicatorEnabled: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">Enable Deduplicator</span>
                </label>

                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={filters.digitalReleaseFilterEnabled} onChange={(e) => setFilters({ ...filters, digitalReleaseFilterEnabled: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">Enable Digital Release Filter</span>
                </label>
              </div>
            )}

            {activeTab === 'sorting' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Sort Criteria (Drag to reorder)</h2>
                {sorting.map((item, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={() => setDraggedItem(null)}
                    className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg cursor-move"
                  >
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    <span className="flex-1 text-white">{index + 1}. {item.name}</span>
                    <button
                      onClick={() => toggleSortOrder(index)}
                      className={`px-3 py-1 rounded text-sm ${item.order === 'asc' ? 'bg-green-600' : 'bg-blue-600'} text-white`}
                    >
                      {item.order === 'asc' ? '↑ ASC' : '↓ DESC'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'formatter' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Display Style</h2>
                {['Google Drive', 'Light Google Drive', 'Prism'].map(style => (
                  <label key={style} className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={formatter === style}
                      onChange={() => setFormatter(style)}
                      className="w-5 h-5"
                    />
                    <span className="text-gray-300">{style}</span>
                  </label>
                ))}
              </div>
            )}

            {activeTab === 'misc' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Playback Options</h2>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={misc.preCacheNextEp} onChange={(e) => setMisc({ ...misc, preCacheNextEp: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">Pre-cache next episode</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={misc.autoPlay} onChange={(e) => setMisc({ ...misc, autoPlay: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">Auto Play</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={misc.areYouStillThere} onChange={(e) => setMisc({ ...misc, areYouStillThere: e.target.checked })} className="w-5 h-5" />
                  <span className="text-gray-300">"Are you still there?" prompt</span>
                </label>
              </div>
            )}

            {activeTab === 'install' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Configuration JSON</h2>
                  <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto mb-4 max-h-96">
                    <pre className="text-sm text-green-400 font-mono">
                      {JSON.stringify(generateConfig(), null, 2)}
                    </pre>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={copyJSON} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                      <Copy className="w-4 h-4" />
                      Copy JSON
                    </button>
                    <button onClick={downloadJSON} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                      <Download className="w-4 h-4" />
                      Download JSON
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Installation URL</h2>
                  <input
                    type="text"
                    value={`https://your-addon.com/${btoa(JSON.stringify(generateConfig()))}/manifest.json`}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 font-mono text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}