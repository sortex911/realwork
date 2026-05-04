import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COL_TEAM } from '../services/adminService';
import FadeUp from './FadeUp';
import './Team.css';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, COL_TEAM), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      setTeam(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading && team.length === 0) return null;
  if (team.length === 0) return null;

  return (
    <section className="team-section" id="team">
      <div className="container mx-auto px-4">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="text-accent uppercase tracking-widest text-sm font-semibold">Our People</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-slate-900">Meet the Team</h2>
            <p className="text-slate-500 mt-4 max-w-lg mx-auto">
              A dedicated team of landscape architects and professionals committed to creating nature's paradise.
            </p>
          </div>
        </FadeUp>

        <div className="team-grid">
          {team.map((member, index) => (
            <FadeUp key={member.id} delay={index * 100}>
              <div className="team-card">
                <div className="team-image-wrapper">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="team-image" />
                  ) : (
                    <div className="team-image-placeholder">👤</div>
                  )}
                  <div className="team-socials">
                    {/* Add social links if needed in the future */}
                  </div>
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
