import React from 'react';
import MembersList from '../components/MembersList';

export default function Members() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <h1>Members</h1>
          <p>Manage members in your organization.</p>
        </div>
        <button className="btn btn-primary">+ Invite Member</button>
      </div>
      <MembersList />
    </>
  );
}
